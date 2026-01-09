const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [300, 600, 900, 1200];
const quality = 80;

const processImage = async (inputPath, outputDir) => {
    const filename = path.basename(inputPath, path.extname(inputPath));
    
    // Crear versiones WebP
    for (const size of sizes) {
        const outputPath = path.join(outputDir, `${filename}-${size}.webp`);
        await sharp(inputPath)
            .resize(size)
            .webp({ quality })
            .toFile(outputPath);
        console.log(`Created: ${outputPath}`);
    }

    // Crear versiones JPEG para fallback
    for (const size of sizes) {
        const outputPath = path.join(outputDir, `${filename}-${size}.jpg`);
        await sharp(inputPath)
            .resize(size)
            .jpeg({ quality })
            .toFile(outputPath);
        console.log(`Created: ${outputPath}`);
    }
};

const processDirectory = async (inputDir, outputDir) => {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const files = fs.readdirSync(inputDir);
    
    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const stat = fs.statSync(inputPath);
        
        if (stat.isDirectory()) {
            const newOutputDir = path.join(outputDir, file);
            await processDirectory(inputPath, newOutputDir);
        } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
            await processImage(inputPath, outputDir);
        }
    }
};

const sourcePath = path.join(__dirname, 'assets', 'images');
const outputPath = path.join(__dirname, 'assets', 'images', 'processed');

processDirectory(sourcePath, outputPath)
    .then(() => console.log('Image processing complete!'))
    .catch(err => console.error('Error processing images:', err));