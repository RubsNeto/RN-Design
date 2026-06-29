// Script de build (uso único / manual): otimiza imagens pesadas.
// Converte as imagens de serviço (servidas como background-image, sem passar
// pelo next/image) para WebP redimensionado. Rode com: node scripts/optimize-images.mjs
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";

const cwd = process.cwd();

const targets = [
	// Imagens dos cards de serviço (background-image cru -> WebP).
	{ dir: "public/images/services", names: ["uiux", "web", "branding", "marketing", "consultoria", "suporte"], width: 1000, quality: 80 },
];

let totalBefore = 0;
let totalAfter = 0;

for (const t of targets) {
	for (const name of t.names) {
		const src = path.join(cwd, t.dir, `${name}.png`);
		const out = path.join(cwd, t.dir, `${name}.webp`);
		if (!fs.existsSync(src)) {
			console.warn("skip (nao existe):", src);
			continue;
		}
		const before = fs.statSync(src).size;
		const info = await sharp(src)
			.resize({ width: t.width, withoutEnlargement: true })
			.webp({ quality: t.quality })
			.toFile(out);
		totalBefore += before;
		totalAfter += info.size;
		console.log(
			`${name}: ${(before / 1024).toFixed(0)}KB -> ${(info.size / 1024).toFixed(0)}KB (${info.width}x${info.height})`
		);
	}
}

console.log(
	`\nTotal: ${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(totalAfter / 1024 / 1024).toFixed(2)}MB`
);
