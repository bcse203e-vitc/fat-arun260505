
function normalizeText(fileName, mode) {
    let whitespaceCorrections = 0;
    const fileContent = fs.readFileSync(fileName, 'utf8').toString();
    const lines = fileContent.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
        lines[i] = lines[i].trim(); 
        let line = lines[i];
        
        while (line.includes('   ')) { 
            line = line.replace(/   /g, ' ');
            whitespaceCorrections++;
        }
        line = line.replace(/\t/g, ' '); 
        
        if (mode === "compress") {
            while (line.includes('\n\n')) { 
                line = line.replace(/\n\n+/g, '\n');
                whitespaceCorrections++;
            }
        } else if (mode === "expand") {
            let newLines = [];
            
            for (let j = 0; j < lines.length; j++) {
                newLines.push(lines[j]);
                if (j !== lines.length - 1) { 
                    newLines.push('');
                }
            }
            
            lines = newLines;
        }
        
        if (!line.match(/[a-zA-Z]/)) { 
            console.log(`Line ${i} contains only punctuation: "${line}"`);
        }
    }
    
    fs.writeFileSync(fileName, lines.join('\n')); 
    
    return whitespaceCorrections;
}
