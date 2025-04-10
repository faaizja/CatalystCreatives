/**
 * Placeholder Image Generator
 * Creates colored rectangles with text to use during development
 */

document.addEventListener('DOMContentLoaded', function() {
    replacePlaceholderImages();
});

function replacePlaceholderImages() {
    // Target any image whose src contains "placeholder"
    const placeholderImages = document.querySelectorAll('img[src*="placeholder"]');
    
    // Color palettes for different image types
    const colorPalettes = {
        hero: ['#0D324D', '#1F5D8C', '#4297C3', '#96CAE9'],
        service: ['#7F5A83', '#A188AA', '#C4B1D0', '#E5D7ED'],
        portfolio: ['#2E3A5C', '#4E6096', '#7D91D2', '#C6CCE9'],
        about: ['#276556', '#3D8F7A', '#65C2A7', '#A5E4D1'],
        testimonial: ['#8C6D46', '#B39268', '#D4BB95', '#E9DCCB'],
        icon: ['#4F4A4A', '#6C6666', '#908C8C', '#C1BEBE'],
        default: ['#565656', '#777777', '#999999', '#BBBBBB']
    };

    placeholderImages.forEach(img => {
        // Get image dimensions
        const width = img.getAttribute('width') || img.width || 800;
        const height = img.getAttribute('height') || img.height || 600;
        
        // Determine image type based on src or parent class
        let imageType = 'default';
        const src = img.getAttribute('src').toLowerCase();
        const parentClass = img.parentElement.className.toLowerCase();
        
        if (src.includes('hero') || parentClass.includes('hero')) {
            imageType = 'hero';
        } else if (src.includes('service') || parentClass.includes('service')) {
            imageType = 'service';
        } else if (src.includes('portfolio') || parentClass.includes('portfolio')) {
            imageType = 'portfolio';
        } else if (src.includes('about') || parentClass.includes('about')) {
            imageType = 'about';
        } else if (src.includes('testimonial') || parentClass.includes('testimonial')) {
            imageType = 'testimonial';
        } else if (src.includes('icon') || parentClass.includes('icon')) {
            imageType = 'icon';
        }
        
        // Get color palette for image type
        const colors = colorPalettes[imageType];
        
        // Generate SVG placeholder
        const placeholderSVG = generatePlaceholderSVG(width, height, colors, imageType);
        
        // Create a base64 data URL
        const dataURL = 'data:image/svg+xml;base64,' + btoa(placeholderSVG);
        
        // Set the src attribute
        img.src = dataURL;
        
        // Add fade-in animation
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.onload = function() {
            img.style.opacity = '1';
        };
    });
}

function generatePlaceholderSVG(width, height, colors, type) {
    // Random pattern generation
    const patternType = ['circles', 'squares', 'lines'][Math.floor(Math.random() * 3)];
    
    let pattern = '';
    
    // Create background pattern based on type
    switch (patternType) {
        case 'circles':
            for (let i = 0; i < 10; i++) {
                const cx = Math.random() * width;
                const cy = Math.random() * height;
                const r = (Math.random() * width / 10) + 10;
                const color = colors[Math.floor(Math.random() * colors.length)];
                const opacity = Math.random() * 0.5 + 0.1;
                pattern += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="${opacity}" />`;
            }
            break;
        case 'squares':
            for (let i = 0; i < 8; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const size = (Math.random() * width / 10) + 20;
                const color = colors[Math.floor(Math.random() * colors.length)];
                const opacity = Math.random() * 0.5 + 0.1;
                const rotation = Math.random() * 45;
                pattern += `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${color}" opacity="${opacity}" transform="rotate(${rotation} ${x + size/2} ${y + size/2})" />`;
            }
            break;
        case 'lines':
            for (let i = 0; i < 15; i++) {
                const x1 = Math.random() * width;
                const y1 = Math.random() * height;
                const x2 = Math.random() * width;
                const y2 = Math.random() * height;
                const stroke = colors[Math.floor(Math.random() * colors.length)];
                const strokeWidth = (Math.random() * 10) + 3;
                const opacity = Math.random() * 0.5 + 0.1;
                pattern += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}" />`;
            }
            break;
    }
    
    // Create the full SVG
    const backgroundGradient = `
        <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:${colors[0]};stop-opacity:1" />
                <stop offset="100%" style="stop-color:${colors[1]};stop-opacity:1" />
            </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)" />
    `;
    
    // Text label based on type
    const textLabel = type.charAt(0).toUpperCase() + type.slice(1);
    const textElement = `
        <text x="50%" y="50%" font-family="Cairo, sans-serif" font-size="${Math.min(width, height) / 10}px" 
              fill="white" text-anchor="middle" dominant-baseline="middle" font-weight="600">
            ${textLabel}
        </text>
    `;

    return `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
            ${backgroundGradient}
            ${pattern}
            ${textElement}
        </svg>
    `;
}