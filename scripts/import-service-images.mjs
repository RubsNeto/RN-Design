// Converte as novas imagens dos serviços (em Downloads) para WebP otimizado,
// já mapeadas para o serviço correto. Rode com:
//   node scripts/import-service-images.mjs
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";

const downloads = "C:/Users/ruben/Downloads";
const outDir = path.join(process.cwd(), "public/images/services");

// origem (Downloads) -> destino (nome do serviço)
const mapping = [
	{ src: "ChatGPT Image 23 de jun. de 2026, 12_54_45 (1).png", dest: "uiux" },        // UI/UX Design
	{ src: "ChatGPT Image 23 de jun. de 2026, 12_54_45 (2).png", dest: "web" },         // Desenvolvimento Web
	{ src: "ChatGPT Image 23 de jun. de 2026, 12_54_45 (3).png", dest: "branding" },    // Branding & Identidade
	{ src: "ChatGPT Image 23 de jun. de 2026, 12_54_45 (4).png", dest: "marketing" },   // Marketing Digital
	{ src: "ChatGPT Image 23 de jun. de 2026, 12_54_45 (5).png", dest: "consultoria" }, // Consultoria
	{ src: "ChatGPT Image 23 de jun. de 2026, 12_54_45 (6).png", dest: "suporte" },     // Manutenção & Suporte
];

for (const m of mapping) {
	const src = path.join(downloads, m.src);
	const out = path.join(outDir, `${m.dest}.webp`);
	if (!fs.existsSync(src)) {
		console.warn("FALTANDO:", src);
		continue;
	}
	const info = await sharp(src)
		.resize({ width: 1100, withoutEnlargement: true })
		.webp({ quality: 82 })
		.toFile(out);
	console.log(`${m.dest}.webp <- "${m.src}"  (${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)}KB)`);
}
