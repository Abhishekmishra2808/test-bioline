// Database Search Module for NCBI, SILVA, and PR2
// This module searches for lineage information in public databases

class DatabaseSearcher {
    constructor() {
        // Mock database entries for demonstration
        // In production, this would call actual APIs
        this.databases = {
            ncbi: this.initNCBIDatabase(),
            silva: this.initSILVADatabase(),
            pr2: this.initPR2Database()
        };
    }

    // Initialize mock NCBI database with more comprehensive sequences
    initNCBIDatabase() {
        return [
            // Fish sequences (COI)
            { marker: 'COI', sequence_fragment: 'GATCCTCCAGENTTAGTTCGCTTGCACTGAATAGACCCG', kingdom: 'Eukaryota', phylum: 'Chordata', class: 'Actinopterygii', order: 'Perciformes', family: 'Serranidae', genus: 'Epinephelus', species: 'Epinephelus malabaricus' },
            { marker: 'COI', sequence_fragment: 'GATCCTCCAGENTTAG', kingdom: 'Eukaryota', phylum: 'Chordata', class: 'Actinopterygii', order: 'Perciformes', family: 'Serranidae', genus: 'Epinephelus', species: 'Epinephelus malabaricus' },
            
            // Crustacean sequences (18S and COI)
            { marker: '18S', sequence_fragment: 'TCAGACCGTGAATTATTCGGACTGAGCCACTCTAGAGCT', kingdom: 'Eukaryota', phylum: 'Arthropoda', class: 'Malacostraca', order: 'Decapoda', family: 'Penaeidae', genus: 'Penaeus', species: 'Penaeus monodon' },
            { marker: 'COI', sequence_fragment: 'ATAGACCCGTCACACAGGAGAGTTTCTACAGGCGGTTAG', kingdom: 'Eukaryota', phylum: 'Arthropoda', class: 'Malacostraca', order: 'Decapoda', family: 'Penaeidae', genus: 'Penaeus', species: 'Penaeus monodon' },
            
            // Mollusk sequences (COI)
            { marker: 'COI', sequence_fragment: 'ATAGACCCGTCACACAGGAGAGTTTCTACAGGCGGTTAG', kingdom: 'Eukaryota', phylum: 'Mollusca', class: 'Cephalopoda', order: 'Octopoda', family: 'Octopodidae', genus: 'Octopus', species: 'Octopus vulgaris' },
            
            // Coral sequences (18S)
            { marker: '18S', sequence_fragment: 'GAGGTCGTGAGTGGTGGTTATGCCTGTCGAACTAGAGAT', kingdom: 'Eukaryota', phylum: 'Cnidaria', class: 'Anthozoa', order: 'Scleractinia', family: 'Acroporidae', genus: 'Acropora', species: 'Acropora cervicornis' },
            { marker: '18S', sequence_fragment: 'GAGGTCGTGAGTGGTGGTTATGCCTGTCG', kingdom: 'Eukaryota', phylum: 'Cnidaria', class: 'Anthozoa', order: 'Scleractinia', family: 'Acroporidae', genus: 'Acropora', species: 'Acropora palmata' },
            
            // Add partial matches for common sequences
            { marker: 'COI', sequence_fragment: 'TCACACAGGAGAGTTTCTACAGGCGGTTAG', kingdom: 'Eukaryota', phylum: 'Mollusca', class: 'Gastropoda', order: 'Neogastropoda', family: 'Conidae', genus: 'Conus', species: 'Conus magus' },
            { marker: '18S', sequence_fragment: 'GGTGGTTATGCCTGTCGAACTAGAGAT', kingdom: 'Eukaryota', phylum: 'Cnidaria', class: 'Hydrozoa', order: 'Anthoathecata', family: 'Hydridae', genus: 'Hydra', species: 'Hydra vulgaris' }
        ];
    }

    // Initialize mock SILVA database (specialized in rRNA)
    initSILVADatabase() {
        return [
            { marker: '18S', sequence_fragment: 'TCAGACCGTGAATTATTCGGACTGAGCCACTCTAGAGCT', kingdom: 'Eukaryota', phylum: 'Arthropoda', class: 'Malacostraca', order: 'Decapoda', family: 'Penaeidae', genus: 'Penaeus', species: 'Penaeus monodon' },
            { marker: '18S', sequence_fragment: 'GAGGTCGTGAGTGGTGGTTATGCCTGTCGAACTAGAGAT', kingdom: 'Eukaryota', phylum: 'Cnidaria', class: 'Anthozoa', order: 'Scleractinia', family: 'Acroporidae', genus: 'Acropora', species: 'Acropora palmata' },
            { marker: '18S', sequence_fragment: 'GGTGAGGGGTCGGCTGTTCCTAGGGCCGAGGTCGTGAGT', kingdom: 'Eukaryota', phylum: 'Alveolata', class: 'Dinoflagellata', order: 'Gonyaulacales', family: 'Gonyaulacaceae', genus: 'Alexandrium', species: 'Alexandrium tamarense' },
            { marker: '18S', sequence_fragment: 'CGGCTGTTCCTAGGGCCGAGGTCGTGAGTGGTGGTTATG', kingdom: 'Eukaryota', phylum: 'Stramenopiles', class: 'Bacillariophyceae', order: 'Naviculales', family: 'Naviculaceae', genus: 'Navicula', species: 'Navicula pelliculosa' }
        ];
    }

    // Initialize mock PR2 database (Protist Ribosomal Reference)
    initPR2Database() {
        return [
            { marker: '18S', sequence_fragment: 'GGTGAGGGGTCGGCTGTTCCTAGGGCCGAGGTCGTGAGT', kingdom: 'Eukaryota', phylum: 'Alveolata', class: 'Dinoflagellata', order: 'Gonyaulacales', family: 'Gonyaulacaceae', genus: 'Alexandrium', species: 'Alexandrium catenella' },
            { marker: '18S', sequence_fragment: 'CGGCTGTTCCTAGGGCCGAGGTCGTGAGTGGTGGTTATG', kingdom: 'Eukaryota', phylum: 'Stramenopiles', class: 'Bacillariophyceae', order: 'Centrales', family: 'Thalassiosiraceae', genus: 'Thalassiosira', species: 'Thalassiosira oceanica' },
            { marker: '18S', sequence_fragment: 'ATGGCTCATTAAATCAGTTATAGTTTATTTGATGGTACC', kingdom: 'Eukaryota', phylum: 'Rhizaria', class: 'Foraminifera', order: 'Rotaliida', family: 'Elphidiidae', genus: 'Elphidium', species: 'Elphidium excavatum' },
            { marker: '18S', sequence_fragment: 'TCCTAGGGCCGAGGTCGTGAGTGGTGGTTATGCCTGTCG', kingdom: 'Eukaryota', phylum: 'Ciliophora', class: 'Spirotrichea', order: 'Choreotrichida', family: 'Strombidiidae', genus: 'Strombidium', species: 'Strombidium sulcatum' }
        ];
    }

    // Calculate sequence similarity (improved - uses sliding window for partial matches)
    calculateSimilarity(seq1, seq2) {
        if (!seq1 || !seq2) return 0;
        
        // Clean sequences
        const cleanSeq1 = seq1.replace(/\s/g, '').toUpperCase();
        const cleanSeq2 = seq2.replace(/\s/g, '').toUpperCase();
        
        // Exact match check
        if (cleanSeq1 === cleanSeq2) return 100;
        
        // Check if one contains the other (substring match)
        if (cleanSeq1.includes(cleanSeq2) || cleanSeq2.includes(cleanSeq1)) {
            const minLen = Math.min(cleanSeq1.length, cleanSeq2.length);
            const maxLen = Math.max(cleanSeq1.length, cleanSeq2.length);
            return (minLen / maxLen) * 100;
        }
        
        // Sliding window comparison for best alignment
        const shortSeq = cleanSeq1.length <= cleanSeq2.length ? cleanSeq1 : cleanSeq2;
        const longSeq = cleanSeq1.length > cleanSeq2.length ? cleanSeq1 : cleanSeq2;
        
        let maxMatches = 0;
        const windowSize = shortSeq.length;
        
        // Try all possible alignments
        for (let i = 0; i <= longSeq.length - windowSize; i++) {
            let matches = 0;
            for (let j = 0; j < windowSize; j++) {
                if (shortSeq[j] === longSeq[i + j]) matches++;
            }
            maxMatches = Math.max(maxMatches, matches);
        }
        
        return (maxMatches / windowSize) * 100;
    }

    // Search in a specific database with better matching
    searchInDatabase(dbName, marker, sequence, threshold = 85) {
        const db = this.databases[dbName];
        if (!db) return null;

        // Clean and normalize sequence
        const cleanSeq = sequence.replace(/\s/g, '').toUpperCase();
        
        // Need at least 20 characters to search
        if (cleanSeq.length < 20) return null;
        
        // Find best match
        let bestMatch = null;
        let bestSimilarity = 0;

        for (const entry of db) {
            // Check if marker matches (flexible matching)
            const entryMarker = entry.marker.toUpperCase();
            const searchMarker = marker.toUpperCase();
            
            if (!entryMarker.includes(searchMarker) && !searchMarker.includes(entryMarker)) {
                continue;
            }

            // Calculate similarity
            const similarity = this.calculateSimilarity(cleanSeq, entry.sequence_fragment);
            
            if (similarity > bestSimilarity && similarity >= threshold) {
                bestSimilarity = similarity;
                bestMatch = {
                    database: dbName.toUpperCase(),
                    similarity: similarity.toFixed(2),
                    lineage: {
                        kingdom: entry.kingdom,
                        phylum: entry.phylum,
                        class: entry.class,
                        order: entry.order,
                        family: entry.family,
                        genus: entry.genus,
                        species: entry.species
                    }
                };
            }
        }

        return bestMatch;
    }

    // Search across all databases
    async searchAllDatabases(marker, sequence) {
        console.log(`[Database Search] Searching for ${marker} marker...`);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const results = {
            ncbi: this.searchInDatabase('ncbi', marker, sequence),
            silva: this.searchInDatabase('silva', marker, sequence),
            pr2: this.searchInDatabase('pr2', marker, sequence)
        };

        // Find the best match across all databases
        let bestResult = null;
        let bestSimilarity = 0;
        let foundIn = [];

        for (const [dbName, result] of Object.entries(results)) {
            if (result && parseFloat(result.similarity) > bestSimilarity) {
                bestSimilarity = parseFloat(result.similarity);
                bestResult = result;
            }
            if (result) {
                foundIn.push(dbName.toUpperCase());
            }
        }

        return {
            found: bestResult !== null,
            bestMatch: bestResult,
            foundInDatabases: foundIn,
            searchedDatabases: ['NCBI', 'SILVA', 'PR2'],
            allResults: results
        };
    }

    // Generate UID for novel species
    generateUID() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substring(2, 10).toUpperCase();
        return `BLC-${random}${timestamp}`.substring(0, 16);
    }
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DatabaseSearcher;
}
