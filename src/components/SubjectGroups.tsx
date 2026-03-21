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