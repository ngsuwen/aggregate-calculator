export const polyAggregateTypes = ['ELR2B2-A','ELR2B2-B','ELR2B2-C','ELR2B2-D']

export const polyAggregateTypesBCD = ['ELR2B2-B','ELR2B2-C','ELR2B2-D']

export const L1R5_L1 = ['English','Higher Chinese','Higher Malay','Higher Tamil']

export const L1R5_R1 = ['Bahasa Indonesia as a Third Language','Chinese (Special Programme)','Geography','Higher Art']

export const L1R5_R2 = ['Additional Mathematics','Mathematics','Biology','Chemistry','Physics','Science (Chemistry, Biology)','Science (Physics, Biology)','Science (Physics, Chemistry)']

export const L1R5_R3 = [...L1R5_R1, ...L1R5_R2, ...L1R5_L1]

export const ELR2B2_A_G1 = ['Art','Music','Economics']

export const ELR2B2_A_G2 = ['Additional Mathematics','Mathematics','Art','Music','Economics']

export const ELR2B2_BCD_G1 = ['Additional Mathematics','Mathematics']

export const ELR2B2_B_G2 = ['Additional Mathematics','Mathematics','Art','Music','Economics']

export const ELR2B2_C_G2 = ['Additional Mathematics','Mathematics','Art','Music','Economics']

export const ELR2B2_D_G2 = ['Additional Mathematics','Mathematics','Art','Music','Economics']

export const scoreChecker=(grade:string):number=>{
    if (grade === 'A1') { return 1 }
    if (grade === 'A2') { return 2 }
    if (grade === 'B3') { return 3 }
    if (grade === 'B4') { return 4 }
    if (grade === 'C5') { return 5 }
    if (grade === 'C6') { return 6 }
    if (grade === 'D7') { return 7 }
    if (grade === 'E8') { return 8 }
    if (grade === '9') { return 9 }
    return 0
}