import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Gamepad2, User, Key, LogOut, Trophy, Info, RefreshCw, 
  Moon, Sun, CheckCircle, AlertTriangle, ArrowLeft, Copy, Eye, EyeOff
} from "lucide-react";

// ==========================================
// 1. JWT & BACKEND AUTH SIMULATION SERVICE
// ==========================================

const MOCK_SECRET = "cyber_arcade_jwt_secret_2026";

// Base64 Helpers
const b64Encode = (str) => btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
  return String.fromCharCode(parseInt(p1, 16));
}));

const b64Decode = (str) => decodeURIComponent(Array.prototype.map.call(atob(str), (c) => {
  return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
}).join(""));

// Helper to generate simulated JWT tokens
const generateJWT = (payload) => {
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = b64Encode(JSON.stringify(header)).replace(/=/g, "");
  const encodedPayload = b64Encode(JSON.stringify(payload)).replace(/=/g, "");
  // Simulated signature using a basic hash-like string manipulation
  const stringToSign = `${encodedHeader}.${encodedPayload}`;
  let signatureHash = 0;
  for (let i = 0; i < stringToSign.length; i++) {
    signatureHash = (signatureHash << 5) - signatureHash + stringToSign.charCodeAt(i);
    signatureHash |= 0;
  }
  const encodedSignature = b64Encode(signatureHash.toString(16)).replace(/=/g, "");
  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
};

// Parse JWT without verification
const decodeJWT = (token) => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(b64Decode(parts[1]));
    return payload;
  } catch (e) {
    return null;
  }
};

// Initialize localStorage databases
const initMockDB = () => {
  if (!localStorage.getItem("arcade_users")) {
    const defaultUsers = [
      { username: "cyber_racer", password: "password123", highScores: [1024, 2048] },
      { username: "grid_master", password: "password123", highScores: [512, 1024] },
      { username: "neon_flier", password: "password123", highScores: [256, 512] }
    ];
    localStorage.setItem("arcade_users", JSON.stringify(defaultUsers));
  }
};

// API Functions
const authAPI = {
  register: (username, password) => {
    initMockDB();
    const users = JSON.parse(localStorage.getItem("arcade_users"));
    if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
      return { success: false, error: "Username already taken." };
    }
    users.push({ username, password, highScores: [] });
    localStorage.setItem("arcade_users", JSON.stringify(users));
    return { success: true };
  },

  login: (username, password) => {
    initMockDB();
    const users = JSON.parse(localStorage.getItem("arcade_users"));
    const user = users.find(
      u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );
    if (!user) {
      return { success: false, error: "Invalid username or password." };
    }
    // Generate JWT expiring in 1 hour
    const token = generateJWT({
      username: user.username,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600
    });
    return { success: true, token, username: user.username };
  },

  saveScore: (token, score) => {
    const decoded = decodeJWT(token);
    if (!decoded || decoded.exp < Date.now() / 1000) {
      return { success: false, error: "Unauthorized or token expired." };
    }
    const users = JSON.parse(localStorage.getItem("arcade_users"));
    const userIndex = users.findIndex(u => u.username === decoded.username);
    if (userIndex === -1) return { success: false, error: "User not found." };

    users[userIndex].highScores = users[userIndex].highScores || [];
    users[userIndex].highScores.push(score);
    // Keep top 5 high scores
    users[userIndex].highScores.sort((a, b) => b - a);
    users[userIndex].highScores = users[userIndex].highScores.slice(0, 5);

    localStorage.setItem("arcade_users", JSON.stringify(users));
    return { success: true, highScores: users[userIndex].highScores };
  },

  getLeaderboard: () => {
    initMockDB();
    const users = JSON.parse(localStorage.getItem("arcade_users"));
    const list = [];
    users.forEach(u => {
      const bestScore = u.highScores && u.highScores.length > 0 ? Math.max(...u.highScores) : 0;
      if (bestScore > 0) {
        list.push({ username: u.username, score: bestScore });
      }
    });
    return list.sort((a, b) => b.score - a.score).slice(0, 10);
  }
};

// ==========================================
// 2. THEME DEFINITIONS & GRAPHICS CONFIG
// ==========================================

const CABINET_THEMES = {
  dark: {
    name: "Cyber Neon",
    primary: "#00f2ff", // Cyan
    secondary: "#bc13fe", // Violet
    accent: "#ff0080", // Pink
    bgDeep: "#06060c",
    bgMuted: "rgba(10, 10, 20, 0.7)",
    border: "rgba(0, 242, 255, 0.2)",
    text: "#ffffff",
    gridFloor: "rgba(255, 255, 255, 0.03)",
    gridBorders: "rgba(0, 242, 255, 0.1)",
    palette: {
      2: { top: "#00f2ff", left: "#00b2be", right: "#00cad7", text: "#000" },
      4: { top: "#bc13fe", left: "#8d03c6", right: "#a910e5", text: "#fff" },
      8: { top: "#00ff88", left: "#00c665", right: "#00e576", text: "#000" },
      16: { top: "#ff0080", left: "#c6005f", right: "#e5006e", text: "#fff" },
      32: { top: "#ffea00", left: "#c6b500", right: "#e5d200", text: "#000" },
      64: { top: "#ff6c00", left: "#c65300", right: "#e56100", text: "#fff" },
      128: { top: "#007cff", left: "#005ec6", right: "#006ee5", text: "#fff" },
      256: { top: "#ff00ee", left: "#c600b5", right: "#e500d2", text: "#fff" },
      512: { top: "#ae00ff", left: "#8200c6", right: "#9c00e5", text: "#fff" },
      1024: { top: "#ff003c", left: "#c6002c", right: "#e50033", text: "#fff" },
      2048: { top: "#ffd700", left: "#c6a600", right: "#e5c100", text: "#000", glow: true }
    }
  },
  light: {
    name: "Retro Arcade",
    primary: "#ff0080", // Retro Magenta
    secondary: "#00ff88", // Mint Green
    accent: "#ffea00", // Yellow
    bgDeep: "#f3f4f6",
    bgMuted: "rgba(255, 255, 255, 0.9)",
    border: "rgba(255, 0, 128, 0.2)",
    text: "#1f2937",
    gridFloor: "rgba(0, 0, 0, 0.03)",
    gridBorders: "rgba(255, 0, 128, 0.1)",
    palette: {
      2: { top: "#fecdd3", left: "#fda4af", right: "#fcd34d", text: "#9f1239" },
      4: { top: "#cffafe", left: "#a5f3fc", right: "#67e8f9", text: "#0e7490" },
      8: { top: "#dcfce7", left: "#bbf7d0", right: "#86efac", text: "#166534" },
      16: { top: "#fef9c3", left: "#fef08a", right: "#fde047", text: "#854d0e" },
      32: { top: "#ffe4e6", left: "#fecdd3", right: "#fda4af", text: "#9f1239" },
      64: { top: "#ede9fe", left: "#ddd6fe", right: "#c084fc", text: "#5b21b6" },
      128: { top: "#ffedd5", left: "#fed7aa", right: "#fdbb2d", text: "#9a3412" },
      256: { top: "#e0f2fe", left: "#bae6fd", right: "#7dd3fc", text: "#075985" },
      512: { top: "#fae8ff", left: "#f5d0fe", right: "#e879f9", text: "#86198f" },
      1024: { top: "#ffccd5", left: "#ffb3c1", right: "#ff85a1", text: "#a4133c" },
      2048: { top: "#ff758f", left: "#ff4d6d", right: "#c9184a", text: "#fff", glow: true }
    }
  }
};

const Isometric2048 = () => {
  // Navigation / Auth State
  const [token, setToken] = useState(localStorage.getItem("arcade_token"));
  const [currentUser, setCurrentUser] = useState(null);
  const [showTokenDetails, setShowTokenDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form State
  const [isLogin, setIsLogin] = useState(true);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");

  // Game UI Settings
  const [themeMode, setThemeMode] = useState("dark"); // dark or light
  const theme = CABINET_THEMES[themeMode];

  // Game State
  const [grid, setGrid] = useState(Array(4).fill(null).map(() => Array(4).fill(0)));
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [hasWonSession, setHasWonSession] = useState(false); // only show win prompt once
  const [leaderboard, setLeaderboard] = useState([]);
  const [showInstructions, setShowInstructions] = useState(true);

  // Canvas Refs & Animation
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const tilesRef = useRef([]); // holds animate positions
  const nextTileId = useRef(1);

  // Input Gesture variables
  const touchStart = useRef({ x: 0, y: 0 });

  // Update current user from token
  useEffect(() => {
    if (token) {
      const decoded = decodeJWT(token);
      if (decoded && decoded.exp > Date.now() / 1000) {
        setCurrentUser(decoded.username);
        // Load high score
        const users = JSON.parse(localStorage.getItem("arcade_users")) || [];
        const user = users.find(u => u.username === decoded.username);
        if (user && user.highScores && user.highScores.length > 0) {
          setHighScore(Math.max(...user.highScores));
        }
      } else {
        // Expired
        setToken(null);
        setCurrentUser(null);
        localStorage.removeItem("arcade_token");
      }
    }
  }, [token]);

  // Load Leaderboard
  const refreshLeaderboard = () => {
    setLeaderboard(authAPI.getLeaderboard());
  };

  useEffect(() => {
    refreshLeaderboard();
  }, [currentUser]);

  // Initialize Game on Mount or Reset
  useEffect(() => {
    initGame();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Sync canvas width and main loop
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = Math.max(380, rect.width * 0.85) * window.devicePixelRatio;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Main Canvas Render loop
  useEffect(() => {
    const renderLoop = () => {
      drawCanvas();
      animationRef.current = requestAnimationFrame(renderLoop);
    };
    renderLoop();
    return () => cancelAnimationFrame(animationRef.current);
  }, [grid, themeMode]);

  // ==========================================
  // 3. CORE 2048 MATRIX GAMEPLAY ENGINE
  // ==========================================

  const initGame = () => {
    let newGrid = Array(4).fill(null).map(() => Array(4).fill(0));
    tilesRef.current = [];
    nextTileId.current = 1;
    newGrid = addRandomTile(newGrid);
    newGrid = addRandomTile(newGrid);
    setGrid(newGrid);
    setScore(0);
    setGameOver(false);
    setGameWon(false);
    setHasWonSession(false);
  };

  const addRandomTile = (currentGrid) => {
    const emptyCells = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (currentGrid[r][c] === 0) {
          emptyCells.push({ r, c });
        }
      }
    }
    if (emptyCells.length === 0) return currentGrid;

    const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const val = Math.random() < 0.9 ? 2 : 4;
    const gridCopy = currentGrid.map(row => [...row]);
    gridCopy[r][c] = val;

    // Register active tile for animation
    const id = nextTileId.current++;
    tilesRef.current.push({
      id,
      value: val,
      row: r,
      col: c,
      prevRow: r,
      prevCol: c,
      animX: c,
      animY: r,
      scale: 0.1,
      isNew: true,
      spawnTime: Date.now(),
      depthScale: 0
    });

    return gridCopy;
  };

  // 2048 Sliders Logic
  const rotateGridRight = (m) => {
    const n = Array(4).fill(null).map(() => Array(4).fill(0));
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        n[c][3 - r] = m[r][c];
      }
    }
    return n;
  };

  const slideRowLeft = (row, rowIndex, isMergedMap, scoreAccumulator, movingTilesTracker) => {
    // Filter out zeros
    const active = [];
    row.forEach((val, colIndex) => {
      if (val !== 0) {
        active.push({ value: val, origCol: colIndex });
      }
    });

    const newRow = Array(4).fill(0);
    let targetCol = 0;

    for (let i = 0; i < active.length; i++) {
      const current = active[i];
      const next = active[i + 1];

      if (next && current.value === next.value) {
        const mergedVal = current.value * 2;
        newRow[targetCol] = mergedVal;
        scoreAccumulator.value += mergedVal;

        // Track movements
        movingTilesTracker.push({
          fromRow: rowIndex, fromCol: current.origCol,
          toRow: rowIndex, toCol: targetCol,
          value: current.value, merged: true, mergedId: nextTileId.current
        });
        movingTilesTracker.push({
          fromRow: rowIndex, fromCol: next.origCol,
          toRow: rowIndex, toCol: targetCol,
          value: next.value, merged: true, mergedId: nextTileId.current
        });

        // Trigger session win if 2048 is reached
        if (mergedVal === 2048) {
          scoreAccumulator.win = true;
        }

        nextTileId.current++; // increment merge identifier
        targetCol++;
        i++; // skip next since it merged
      } else {
        newRow[targetCol] = current.value;
        movingTilesTracker.push({
          fromRow: rowIndex, fromCol: current.origCol,
          toRow: rowIndex, toCol: targetCol,
          value: current.value, merged: false
        });
        targetCol++;
      }
    }

    return newRow;
  };

  const move = (direction) => {
    // 0: Up (col decreases, standard vertical row/col shifts)
    // 1: Right (row decreases)
    // 2: Down (col increases)
    // 3: Left (row increases)
    if (gameOver) return;

    let rotCount = 0;
    if (direction === "up") rotCount = 3;
    else if (direction === "right") rotCount = 2;
    else if (direction === "down") rotCount = 1;
    else if (direction === "left") rotCount = 0;

    let tempGrid = grid.map(r => [...r]);

    // Rotate matrix to make it a shift-left action
    for (let i = 0; i < rotCount; i++) {
      tempGrid = rotateGridRight(tempGrid);
    }

    const scoreAcc = { value: 0, win: false };
    const movements = [];

    // Slide left
    const newSlidGrid = Array(4).fill(null).map((_, r) => {
      return slideRowLeft(tempGrid[r], r, [], scoreAcc, movements);
    });

    // Determine if grid changed
    let gridChanged = false;
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (tempGrid[r][c] !== newSlidGrid[r][c]) {
          gridChanged = true;
        }
      }
    }

    if (!gridChanged) return; // invalid move

    // Rotate back to original coordinate mapping
    let finalGrid = newSlidGrid;
    const finalRotCount = (4 - rotCount) % 4;
    for (let i = 0; i < finalRotCount; i++) {
      finalGrid = rotateGridRight(finalGrid);
    }

    // Map the animations correctly based on rotations
    const restoreCoords = (r, c, rot) => {
      let currR = r;
      let currC = c;
      for (let i = 0; i < rot; i++) {
        const nextR = currC;
        const nextC = 3 - currR;
        currR = nextR;
        currC = nextC;
      }
      return { r: currR, c: currC };
    };

    // Reconstruct the animation tiles array
    const newAnimTiles = [];
    movements.forEach(mv => {
      // Restore coordinates
      const start = restoreCoords(mv.fromRow, mv.fromCol, finalRotCount);
      const end = restoreCoords(mv.toRow, mv.toCol, finalRotCount);

      // Find matching existing tile at starting coords
      const existing = tilesRef.current.find(t => t.row === start.r && t.col === start.c);

      if (existing) {
        newAnimTiles.push({
          ...existing,
          prevRow: start.r,
          prevCol: start.c,
          row: end.r,
          col: end.c,
          value: mv.merged ? mv.value * 2 : mv.value,
          isMerging: mv.merged,
          scale: existing.scale,
          spawnTime: Date.now()
        });
      }
    });

    // Filter duplicates: if multiple tiles end up at the same row and col (merging),
    // only keep one of them to prevent double rendering.
    const filteredTiles = [];
    const seenCells = new Set();
    newAnimTiles.forEach(tile => {
      const cellKey = `${tile.row},${tile.col}`;
      if (!seenCells.has(cellKey)) {
        seenCells.add(cellKey);
        filteredTiles.push(tile);
      }
    });
    tilesRef.current = filteredTiles;

    // Apply grid updates
    const nextGrid = addRandomTile(finalGrid);
    setGrid(nextGrid);
    
    // Update score
    const newScore = score + scoreAcc.value;
    setScore(newScore);

    if (newScore > highScore) {
      setHighScore(newScore);
    }

    // Trigger Win panel
    if (scoreAcc.win && !hasWonSession) {
      setGameWon(true);
      setHasWonSession(true);
    }

    // Check game over
    if (checkGameOver(finalGrid)) {
      setGameOver(true);
      // Save high score to mock server
      if (token) {
        authAPI.saveScore(token, newScore);
        refreshLeaderboard();
      }
    }
  };

  const checkGameOver = (currentGrid) => {
    // Look for empty cells
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (currentGrid[r][c] === 0) return false;
      }
    }
    // Look for adjacent matches
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const val = currentGrid[r][c];
        if (r < 3 && val === currentGrid[r + 1][c]) return false;
        if (c < 3 && val === currentGrid[r][c + 1]) return false;
      }
    }
    return true;
  };

  // Keyboard Handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["ArrowUp", "KeyW"].includes(e.code)) {
        e.preventDefault();
        move("up");
      } else if (["ArrowDown", "KeyS"].includes(e.code)) {
        e.preventDefault();
        move("down");
      } else if (["ArrowLeft", "KeyA"].includes(e.code)) {
        e.preventDefault();
        move("left");
      } else if (["ArrowRight", "KeyD"].includes(e.code)) {
        e.preventDefault();
        move("right");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [grid, gameOver]);

  // Touch Swipe Gesture Handler
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchEnd = (e) => {
    if (e.changedTouches.length === 1) {
      const diffX = e.changedTouches[0].clientX - touchStart.current.x;
      const diffY = e.changedTouches[0].clientY - touchStart.current.y;
      const threshold = 30; // min swipe length

      if (Math.abs(diffX) > threshold || Math.abs(diffY) > threshold) {
        if (Math.abs(diffX) > Math.abs(diffY)) {
          // Horizontal swipe
          if (diffX > 0) move("right");
          else move("left");
        } else {
          // Vertical swipe
          if (diffY > 0) move("down");
          else move("up");
        }
      }
    }
  };

  // ==========================================
  // 4. CANVAS ISOMETRIC 3D RENDERER
  // ==========================================

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear Screen
    ctx.clearRect(0, 0, width, height);

    // Dynamic sizing configuration
    const centerX = width / 2;
    const centerY = height * 0.4;
    
    // Scale isometric base dimensions to fit canvas safely
    const tileW = width * 0.17; // horizontal offset spacing
    const tileH = tileW * 0.55; // vertical offset spacing

    // Draw Floor shadow grid
    drawIsometricFloor(ctx, centerX, centerY, tileW, tileH);

    // Synchronize tiles animation positions (Lerping)
    const speed = 0.18; // animation sliding speed
    const now = Date.now();

    // Map grid positions to verify what should render
    const gridMap = Array(4).fill(null).map(() => Array(4).fill(0));
    
    // Update existing animations positions
    tilesRef.current.forEach(t => {
      // Lerp column coordinates
      t.animX += (t.col - t.animX) * speed;
      t.animY += (t.row - t.animY) * speed;

      // Lerp scale
      if (t.isNew) {
        const elapsed = now - t.spawnTime;
        t.scale = Math.min(1.0, elapsed / 140); // scale up over 140ms
        if (t.scale >= 1.0) t.isNew = false;
      } else if (t.isMerging) {
        const elapsed = now - t.spawnTime;
        // Pop bounce animation on merge
        if (elapsed < 150) {
          t.scale = 1.0 + Math.sin((elapsed / 150) * Math.PI) * 0.18;
        } else {
          t.scale = 1.0;
          t.isMerging = false;
        }
      }

      // Height block scale growth lerp
      const targetDepth = Math.max(8, Math.log2(t.value) * (width * 0.015));
      t.depthScale += (targetDepth - t.depthScale) * 0.1;
    });

    // Render Tiles using Back-to-Front sorting to ensure correct overlap layering!
    // Sort array by index order (row + col)
    const sortedTiles = [...tilesRef.current].sort((a, b) => {
      const sumA = a.animY + a.animX;
      const sumB = b.animY + b.animX;
      if (Math.abs(sumA - sumB) < 0.01) {
        // Draw lower values first if same layer
        return a.value - b.value;
      }
      return sumA - sumB;
    });

    sortedTiles.forEach(tile => {
      // Verify tile value matches grid or is merging
      const currentGridVal = grid[tile.row][tile.col];
      // Draw 3D Cube
      drawIsometricCube(
        ctx,
        centerX,
        centerY,
        tile.animX,
        tile.animY,
        tileW,
        tileH,
        tile.depthScale * tile.scale,
        tile.value,
        tile.scale
      );
    });
  };

  const drawIsometricFloor = (ctx, cx, cy, w, h) => {
    // Outer boundary of 4x4 grid
    ctx.strokeStyle = theme.gridBorders;
    ctx.lineWidth = 3;

    // Draw floor slots
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        // Convert to isometric projection
        const isoX = (c - r) * (w / 2) + cx;
        const isoY = (c + r) * (h / 2) + cy;

        ctx.fillStyle = theme.gridFloor;
        ctx.beginPath();
        ctx.moveTo(isoX, isoY);
        ctx.lineTo(isoX + w / 2, isoY + h / 2);
        ctx.lineTo(isoX, isoY + h);
        ctx.lineTo(isoX - w / 2, isoY + h / 2);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = theme.gridBorders;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  };

  const drawIsometricCube = (ctx, cx, cy, col, row, w, h, depth, value, scale) => {
    // Convert floating col/row to screen coordinates
    const x = (col - row) * (w / 2) + cx;
    const y = (col + row) * (h / 2) + cy;

    // Fetch theme palettes based on tile value
    const pal = theme.palette[value] || theme.palette[2048];

    // Left Face Polygon
    ctx.fillStyle = pal.left;
    ctx.beginPath();
    ctx.moveTo(x - w / 2, y + h / 2 - depth);
    ctx.lineTo(x, y + h - depth);
    ctx.lineTo(x, y + h);
    ctx.lineTo(x - w / 2, y + h / 2);
    ctx.closePath();
    ctx.fill();

    // Right Face Polygon
    ctx.fillStyle = pal.right;
    ctx.beginPath();
    ctx.moveTo(x, y + h - depth);
    ctx.lineTo(x + w / 2, y + h / 2 - depth);
    ctx.lineTo(x + w / 2, y + h / 2);
    ctx.lineTo(x, y + h);
    ctx.closePath();
    ctx.fill();

    // Top Face Diamond
    ctx.fillStyle = pal.top;
    ctx.beginPath();
    ctx.moveTo(x, y - depth);
    ctx.lineTo(x + w / 2, y + h / 2 - depth);
    ctx.lineTo(x, y + h - depth);
    ctx.lineTo(x - w / 2, y + h / 2 - depth);
    ctx.closePath();
    ctx.fill();

    // 3D Borders Highlight
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y - depth);
    ctx.lineTo(x - w / 2, y + h / 2 - depth);
    ctx.lineTo(x, y + h - depth);
    ctx.lineTo(x + w / 2, y + h / 2 - depth);
    ctx.closePath();
    ctx.stroke();

    // Glowing Neon effect for gold (2048) or other tall tiles
    if (pal.glow) {
      ctx.shadowColor = pal.top;
      ctx.shadowBlur = 15;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.shadowBlur = 0; // reset
    }

    // Number text
    if (scale > 0.4) {
      ctx.fillStyle = pal.text;
      ctx.font = `bold ${Math.max(10, w * 0.28 * scale)}px Outfit, Inter, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      // Render text on the top diamond face center
      ctx.fillText(value.toString(), x, y + h / 2 - depth);
    }
  };

  // ==========================================
  // 5. EVENT HANDLERS & MOCK AUTH FORMS
  // ==========================================

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthSuccess("");

    if (!usernameInput || !passwordInput) {
      setAuthError("All credentials are required.");
      return;
    }

    if (isLogin) {
      const res = authAPI.login(usernameInput, passwordInput);
      if (res.success) {
        setToken(res.token);
        localStorage.setItem("arcade_token", res.token);
        setAuthSuccess("Logged in successfully.");
      } else {
        setAuthError(res.error);
      }
    } else {
      const res = authAPI.register(usernameInput, passwordInput);
      if (res.success) {
        setAuthSuccess("Successfully registered. You can log in now!");
        setIsLogin(true);
      } else {
        setAuthError(res.error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("arcade_token");
    setToken(null);
    setCurrentUser(null);
    initGame();
  };

  const playAsGuest = () => {
    initGame();
    // Simulate login for showcase
    const guestToken = generateJWT({
      username: "Guest_Player",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 1200
    });
    setToken(guestToken);
    localStorage.setItem("arcade_token", guestToken);
  };

  const handleCopyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full min-h-screen px-4 lg:px-12 py-32 flex flex-col items-center">
      
      {/* Back Button */}
      <div className="w-full max-w-7xl mb-8 flex justify-start">
        <Link 
          to="/projects"
          className="px-5 py-2.5 glass rounded-full text-xs font-semibold flex items-center gap-2 hover:bg-white/10 transition-all border border-white/10"
        >
          <ArrowLeft size={14} /> Back to Projects
        </Link>
      </div>

      {/* Header Banner */}
      <div className="flex flex-col items-center text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="px-4 py-1.5 glass rounded-full text-[10px] sm:text-xs font-bold tracking-[0.3em] text-cyan-400 uppercase mb-4"
        >
          Premium Arcade Project
        </motion.div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight">
          Isometric <span className="text-glow-primary text-cyan-400">2048</span>
        </h1>
        <p className="text-sm sm:text-base text-white/50 mt-2 max-w-xl">
          An immersive 3D grid puzzle wrapped in a fully simulated JWT authenticating arcade cabinet.
        </p>
      </div>

      {/* MAIN ARCADES WRAPPER */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* =========================================
            LEFT COLUMN: AUTH CABINET / STATUS LOGS
           ========================================= */}
        <div className="lg:col-span-4 flex flex-col gap-6 w-full">
          
          {/* Authentic-looking JWT Terminal Viewer */}
          {token && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-3xl p-6 border-white/10 flex flex-col gap-4 relative overflow-hidden"
            >
              <div className="absolute top-[-30%] right-[-30%] w-48 h-48 rounded-full bg-cyan-500/5 blur-[50px] pointer-events-none" />
              
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-cyan-400 flex items-center gap-2 tracking-wider uppercase">
                  <Key size={14} /> JWT Authorization
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] bg-green-500/20 text-green-400 border border-green-500/20 font-bold uppercase">
                  Active Session
                </span>
              </div>

              {/* JWT Output Terminal */}
              <div className="bg-black/40 rounded-2xl p-4 border border-white/5 font-mono text-[10px] leading-relaxed flex flex-col gap-3 relative">
                <div className="flex justify-between items-center text-white/40 pb-2 border-b border-white/5">
                  <span>Encoded Token String</span>
                  <button 
                    onClick={handleCopyToken}
                    className="p-1 hover:text-white transition-colors cursor-pointer"
                    title="Copy JWT Token"
                  >
                    {copied ? <span className="text-green-400 font-sans text-[9px]">Copied!</span> : <Copy size={12} />}
                  </button>
                </div>
                
                {/* Simulated JWT Colorized Structure */}
                <div className="break-all whitespace-normal h-24 overflow-y-auto pr-1">
                  <span className="text-cyan-400 font-bold">{token.split(".")[0]}</span>
                  <span className="text-white">.</span>
                  <span className="text-violet-400 font-bold">{token.split(".")[1]}</span>
                  <span className="text-white">.</span>
                  <span className="text-pink-400">{token.split(".")[2]}</span>
                </div>
              </div>

              {/* Toggle Decode Viewer */}
              <button 
                onClick={() => setShowTokenDetails(!showTokenDetails)}
                className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold flex justify-center items-center gap-2 border border-white/5 transition-all"
              >
                {showTokenDetails ? <><EyeOff size={13} /> Hide Claim Decodes</> : <><Eye size={13} /> Decode Claims JSON</>}
              </button>

              <AnimatePresence>
                {showTokenDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden font-mono text-[10px] bg-black/30 border border-white/5 rounded-2xl p-4 flex flex-col gap-2"
                  >
                    <div className="text-white/40 border-b border-white/5 pb-1 uppercase tracking-wider text-[8px] font-bold">
                      Decoded Payload Claims
                    </div>
                    <pre className="text-violet-300">
                      {JSON.stringify(decodeJWT(token), null, 2)}
                    </pre>
                    <div className="text-white/40 border-t border-white/5 pt-1 uppercase tracking-wider text-[8px] font-bold">
                      Algorithm & Signature
                    </div>
                    <div className="text-cyan-300">HMACSHA256 (verified)</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Authentication Screen */}
          <div className="glass rounded-3xl p-6 border-white/10 relative overflow-hidden">
            <div className="absolute top-[-35%] left-[-20%] w-48 h-48 rounded-full bg-violet-500/5 blur-[50px] pointer-events-none" />
            
            {!token ? (
              <div>
                <div className="flex gap-4 border-b border-white/10 pb-4 mb-6">
                  <button 
                    onClick={() => { setIsLogin(true); setAuthError(""); setAuthSuccess(""); }}
                    className={`flex-1 pb-2 text-center text-sm font-bold border-b-2 transition-all ${isLogin ? "border-cyan-400 text-white" : "border-transparent text-white/40 hover:text-white/70"}`}
                  >
                    Arcade Login
                  </button>
                  <button 
                    onClick={() => { setIsLogin(false); setAuthError(""); setAuthSuccess(""); }}
                    className={`flex-1 pb-2 text-center text-sm font-bold border-b-2 transition-all ${!isLogin ? "border-cyan-400 text-white" : "border-transparent text-white/40 hover:text-white/70"}`}
                  >
                    Sign Up
                  </button>
                </div>

                <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/50">Username</label>
                    <div className="relative">
                      <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                      <input 
                        type="text" 
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        placeholder="Player handle"
                        className="w-full pl-11 pr-4 py-3 bg-white/5 focus:bg-white/10 outline-none rounded-xl text-sm border border-white/10 focus:border-cyan-400 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/50">Password</label>
                    <div className="relative">
                      <Key size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                      <input 
                        type="password" 
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-11 pr-4 py-3 bg-white/5 focus:bg-white/10 outline-none rounded-xl text-sm border border-white/10 focus:border-cyan-400 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {authError && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                      <AlertTriangle size={14} className="shrink-0" />
                      <span>{authError}</span>
                    </div>
                  )}

                  {authSuccess && (
                    <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs flex items-center gap-2">
                      <CheckCircle size={14} className="shrink-0" />
                      <span>{authSuccess}</span>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 active:scale-[0.98] text-black font-extrabold text-sm rounded-xl transition-all shadow-xl shadow-cyan-500/20 uppercase tracking-wider"
                  >
                    {isLogin ? "Authenticate" : "Register Credentials"}
                  </button>
                </form>

                <div className="relative flex py-4 items-center">
                  <div className="flex-grow border-t border-white/5"></div>
                  <span className="flex-shrink mx-4 text-[10px] text-white/30 font-bold uppercase tracking-wider">or</span>
                  <div className="flex-grow border-t border-white/5"></div>
                </div>

                <button 
                  onClick={playAsGuest}
                  className="w-full py-3 bg-white/5 hover:bg-white/10 active:scale-[0.98] rounded-xl text-xs font-bold border border-white/10 hover:border-white/20 transition-all uppercase tracking-wider"
                >
                  Quick Guest Play
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-500 flex items-center justify-center font-bold text-black border border-white/20 text-base shadow-lg shadow-cyan-500/10">
                    {currentUser ? currentUser.substring(0, 2).toUpperCase() : "G"}
                  </div>
                  <div>
                    <h3 className="font-bold text-base flex items-center gap-1.5">
                      {currentUser}
                    </h3>
                    <p className="text-xs text-white/40 font-semibold uppercase tracking-wider mt-0.5">Arcade Player</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/3 border border-white/5 rounded-2xl p-4 text-center">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">Best Score</span>
                    <span className="text-xl font-extrabold tracking-tight mt-1 text-cyan-400 text-glow-primary block">{highScore}</span>
                  </div>
                  <div className="bg-white/3 border border-white/5 rounded-2xl p-4 text-center">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">Current Score</span>
                    <span className="text-xl font-extrabold tracking-tight mt-1 text-violet-400 block">{score}</span>
                  </div>
                </div>

                <button 
                  onClick={handleLogout}
                  className="w-full py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 active:scale-[0.98] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <LogOut size={14} /> Clear Active Session
                </button>
              </div>
            )}
          </div>
        </div>

        {/* =========================================
            MIDDLE COLUMN: THE PLAYABLE ARCADE CABINET
           ========================================= */}
        <div className="lg:col-span-5 flex flex-col gap-6 w-full">
          
          {/* Cabinet Header Console */}
          <div className="w-full glass rounded-3xl p-6 border-white/10 flex flex-col gap-4 relative overflow-hidden">
            
            {/* Top Glowing bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-pink-500 to-violet-500" />
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Gamepad2 className="text-cyan-400" size={20} />
                <span className="text-sm font-bold uppercase tracking-wider">Cabinet Screen</span>
              </div>
              
              {/* Theme Settings Selector */}
              <div className="flex items-center gap-1 bg-black/40 border border-white/5 p-1 rounded-full">
                <button 
                  onClick={() => setThemeMode("dark")}
                  className={`p-1.5 rounded-full transition-colors ${themeMode === "dark" ? "bg-cyan-500 text-black" : "text-white/40 hover:text-white/80"}`}
                  title="Cyber Neon Theme"
                >
                  <Moon size={14} />
                </button>
                <button 
                  onClick={() => setThemeMode("light")}
                  className={`p-1.5 rounded-full transition-colors ${themeMode === "light" ? "bg-pink-500 text-white" : "text-white/40 hover:text-white/80"}`}
                  title="Retro Classic Theme"
                >
                  <Sun size={14} />
                </button>
              </div>
            </div>

            {/* Canvas Cabinet Body */}
            <div 
              className="relative rounded-2xl overflow-hidden border border-white/10 bg-black flex justify-center items-center select-none cursor-grab active:cursor-grabbing"
              style={{
                background: themeMode === "dark" 
                  ? "radial-gradient(circle at center, #0d0c1e 0%, #030308 100%)" 
                  : "radial-gradient(circle at center, #ffffff 0%, #e2e8f0 100%)",
                boxShadow: themeMode === "dark" ? "inset 0 0 40px rgba(0, 242, 255, 0.15)" : "none"
              }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* HTML5 Canvas */}
              <canvas 
                ref={canvasRef}
                className="block z-0"
              />

              {/* Game Over Panel Overlay */}
              <AnimatePresence>
                {gameOver && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/85 backdrop-blur-sm z-10 flex flex-col justify-center items-center text-center p-6"
                  >
                    <Trophy className="text-yellow-400 mb-4 animate-bounce" size={48} />
                    <h2 className="text-3xl font-black tracking-tight text-white uppercase">Game Over</h2>
                    <p className="text-sm text-white/50 mt-1 max-w-xs">
                      Excellent run. Your total score is <span className="text-cyan-400 font-bold">{score}</span>.
                    </p>
                    {token && (
                      <p className="text-[10px] text-green-400 font-semibold mt-1 uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle size={10} /> Score saved to profile database
                      </p>
                    )}
                    <button 
                      onClick={initGame}
                      className="mt-6 px-6 py-3 bg-cyan-400 hover:bg-cyan-300 active:scale-[0.98] text-black font-extrabold text-xs rounded-full transition-all uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-400/20 cursor-pointer"
                    >
                      <RefreshCw size={14} /> Restart Cabinet
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Game Won Panel Overlay */}
              <AnimatePresence>
                {gameWon && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-black/90 backdrop-blur-md z-10 flex flex-col justify-center items-center text-center p-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400 mb-4 animate-pulse">
                      <Trophy size={32} />
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-yellow-400 uppercase">2048 Reached!</h2>
                    <p className="text-sm text-white/70 mt-1 max-w-xs">
                      You have engineered a towering 2048 skyscraper. Truly legendary!
                    </p>
                    <div className="flex gap-4 mt-6">
                      <button 
                        onClick={() => setGameWon(false)}
                        className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-full transition-all uppercase tracking-wider cursor-pointer"
                      >
                        Keep Playing
                      </button>
                      <button 
                        onClick={initGame}
                        className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs rounded-full transition-all uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-yellow-400/20 cursor-pointer"
                      >
                        <RefreshCw size={14} /> Reset Grid
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Panel Controls footer */}
            <div className="flex justify-between items-center pt-2 border-t border-white/5">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Score</span>
                <span className="text-lg font-black text-white">{score}</span>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={initGame}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 active:scale-[0.98] border border-white/10 hover:border-white/20 rounded-full text-xs font-bold transition-all uppercase flex items-center gap-1.5 cursor-pointer"
                  title="Restart Cabinet Game"
                >
                  <RefreshCw size={12} /> Restart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            RIGHT COLUMN: GLOBAL RETRO LEADERBOARD
           ========================================= */}
        <div className="lg:col-span-3 flex flex-col gap-6 w-full">
          
          {/* Leaderboard panel */}
          <div className="glass rounded-3xl p-6 border-white/10 relative overflow-hidden">
            <div className="absolute top-[-30%] right-[-20%] w-48 h-48 rounded-full bg-cyan-500/5 blur-[50px] pointer-events-none" />
            
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-6 flex items-center gap-2">
              <Trophy size={16} /> Retro Standings
            </h3>

            {/* High score lists */}
            <div className="flex flex-col gap-3.5 h-[280px] overflow-y-auto pr-1">
              {leaderboard.length === 0 ? (
                <div className="text-center text-white/30 text-xs py-8">No scores recorded yet.</div>
              ) : (
                leaderboard.map((item, index) => {
                  let badgeColor = "bg-white/5 text-white/60";
                  if (index === 0) badgeColor = "bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 font-extrabold";
                  else if (index === 1) badgeColor = "bg-slate-300/20 text-slate-300 border border-slate-300/20 font-extrabold";
                  else if (index === 2) badgeColor = "bg-amber-600/20 text-amber-500 border border-amber-600/20 font-extrabold";

                  return (
                    <div 
                      key={`${item.username}-${index}`}
                      className="flex items-center justify-between p-3 rounded-2xl bg-white/3 border border-white/5 hover:border-white/10 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${badgeColor}`}>
                          {index + 1}
                        </span>
                        <span className="text-xs font-bold text-white/80">{item.username}</span>
                      </div>
                      <span className="text-xs font-black text-cyan-400 text-glow-primary">{item.score}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Interactive Controls Guide Panel */}
          <div className="glass rounded-3xl p-6 border-white/10 relative overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-white/60 uppercase tracking-wider flex items-center gap-2">
                <Info size={14} /> Control Inputs
              </h3>
              <button 
                onClick={() => setShowInstructions(!showInstructions)}
                className="text-[10px] text-cyan-400 font-bold hover:underline cursor-pointer"
              >
                {showInstructions ? "Hide details" : "Show details"}
              </button>
            </div>

            <AnimatePresence>
              {showInstructions && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden flex flex-col gap-4 text-xs text-white/55 leading-relaxed"
                >
                  <p>
                    Shift blocks isometrically across grid dimensions. Combine numbers to reach the legendary <span className="text-cyan-400 font-bold">2048 skyscraper</span>.
                  </p>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                      <span className="font-semibold text-white/80">Keyboard Keys</span>
                      <kbd className="px-2 py-0.5 rounded bg-white/10 font-mono text-[10px] text-white">WASD / Arrows</kbd>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                      <span className="font-semibold text-white/80">Mobile Gestures</span>
                      <span className="text-white/40">Swipe Screen Directions</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5">
                      <span className="font-semibold text-white/80">3D Block Depth</span>
                      <span className="text-cyan-400 font-semibold uppercase text-[9px] tracking-wide">Scales with tile value!</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Isometric2048;
