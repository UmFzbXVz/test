const runeMap = {
    'a': 'ᚨ', 'á': 'ᚨ', 'ä': 'ᚨ',
    'b': 'ᛒ',
    'c': 'ᚲ', 'k': 'ᚲ',
    'd': 'ᛞ',
    'e': 'ᛖ', 'é': 'ᛖ',
    'f': 'ᚠ',
    'g': 'ᚷ',
    'h': 'ᚺ',
    'i': 'ᛁ', 'í': 'ᛁ',
    'j': 'ᛃ',
    'l': 'ᛚ',
    'm': 'ᛗ',
    'n': 'ᚾ',
    'o': 'ᛟ', 'ó': 'ᛟ', 'ö': 'ᛟ',
    'p': 'ᛈ',
    'q': 'ᚲ',
    'r': 'ᚱ',
    's': 'ᛊ',
    't': 'ᛏ',
    'u': 'ᚢ', 'ú': 'ᚢ',
    'v': 'ᚹ', 'w': 'ᚹ',
    'x': 'ᚲᛊ',
    'y': 'ᛁ',
    'z': 'ᛉ',
    'þ': 'ᚦ', 'ð': 'ᚦ', 'th': 'ᚦ',
    'ŋ': 'ᛜ', 'ng': 'ᛜ',
};

function translateToRunes(text) {
    text = text.toLowerCase();
    let runes = [];
    let i = 0;
    while (i < text.length) {
        if (i + 1 < text.length && ['th', 'ng'].includes(text.substring(i, i + 2))) {
            const digraph = text.substring(i, i + 2);
            runes.push(runeMap[digraph] || text[i]);
            i += 2;
        } else {
            runes.push(runeMap[text[i]] || text[i]);
            i += 1;
        }
    }
    return runes.join('');
}

const input = document.getElementById('input');
const horizontal = document.getElementById('horizontal');
const canvas = document.getElementById('vertical-canvas');
const ctx = canvas.getContext('2d');

const runeSize = 64;
const lineHeightFactor = 0.70; 

const leftPadding = 20;

function drawVerticalRunes() {
    const runes = translateToRunes(input.value);
    const displayRunes = runes || 'ᛖᛗᛗᛖ';

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${runeSize}px 'Segoe UI', Arial, sans-serif`;
    ctx.fillStyle = '#ddd';
    ctx.textBaseline = 'middle';

    let maxRuneWidth = 0;
    for (const rune of displayRunes) {
        const metrics = ctx.measureText(rune);
        if (metrics.width > maxRuneWidth) {
            maxRuneWidth = metrics.width;
        }
    }

    const columnWidth = maxRuneWidth + leftPadding * 2;
    const columnStartX = (canvas.width - columnWidth) / 2;
    const runeStartX = columnStartX + leftPadding;
    const totalRuneHeight = displayRunes.length * runeSize * lineHeightFactor;
    let y = (canvas.height - totalRuneHeight) / 2 + (runeSize * lineHeightFactor / 2);

    ctx.textAlign = 'left';
    for (const rune of displayRunes) {
        ctx.fillText(rune, runeStartX, y);
        y += runeSize * lineHeightFactor;
    }
}

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    drawVerticalRunes();
}

function updateHorizontal() {
    const runes = translateToRunes(input.value);
    horizontal.textContent = runes || 'ᛖᛗᛗᛖ';
}

function updateAll() {
    updateHorizontal();
    drawVerticalRunes();
}

window.addEventListener('resize', resizeCanvas);
input.addEventListener('input', updateAll);

resizeCanvas();
updateHorizontal();
