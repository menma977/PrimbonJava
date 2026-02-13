import type {WetonData} from "@/types/core";

// Constants for DINA (Days)
const DINA = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const DINA_NEPTU = [5, 4, 3, 7, 8, 6, 9];

// Constants for PASARAN (Markets)
const PASARAN = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];
const PASARAN_NEPTU = [5, 9, 7, 4, 8];

// Anchor: 8 July 1633 was JUMAT (Friday) LEGI
// We use a known Javascript Reference Date for easier calculation
// 1 Jan 1900 was Monday (Senin) Pahing (Source: Common Java Calendar tables)
const ANCHOR_DATE = new Date("1900-01-01");
const ANCHOR_PASARAN_INDEX = 1; // Pahing

export class StandardPrimbon {
  
  /**
   * Calculate Weton from a Gregorian Date
   */
  static getWeton(date: Date): WetonData {
    // 1. Get Dina (Day of Week)
    const dinaIndex = date.getDay(); // 0=Sunday, 1=Monday...
    const dina = DINA[dinaIndex];
    const dinaNeptu = DINA_NEPTU[dinaIndex];
    
    // 2. Get Pasaran
    // Calculate days difference from Anchor
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round((date.getTime() - ANCHOR_DATE.getTime()) / oneDay);
    
    // JS modulo operator can return negative for negative numbers. 
    // We adjust logic to handle pre-1900 dates if needed, but MVP assumes post-1900.
    // Pasaran cycle is 5 days.
    let pasaranIndex = (ANCHOR_PASARAN_INDEX + diffDays) % 5;
    if (pasaranIndex < 0) pasaranIndex += 5;
    
    const pasaran = PASARAN[pasaranIndex];
    const pasaranNeptu = PASARAN_NEPTU[pasaranIndex];
    
    return {
      dina,
      pasaran,
      neptu: dinaNeptu + pasaranNeptu
    };
  }
  
  /**
   * Calculate Love Compatibility (Jodoh)
   * Formula: (Neptu A + Neptu B) % 7
   */
  static calculateMatch(neptuA: number, neptuB: number): { score: number; title: string; meaning: string } {
    const total = neptuA + neptuB;
    const remainder = total % 7;
    
    // Remainder 0 is treated as 7
    const index = remainder === 0 ? 7 : remainder;
    
    switch (index) {
      case 1:
        return {score: 90, title: "Wasesa Segara", meaning: "Wealthy, forgiving, and highly respected. A very strong match."};
      case 2:
        return {score: 85, title: "Tunggak Semi", meaning: "Prosperity will always flow. Even if it cuts off, it grows back."};
      case 3:
        return {score: 80, title: "Satria Wibawa", meaning: "Honorable and brings glory to the family."};
      case 4:
        return {score: 75, title: "Sumur Sinaba", meaning: "A source of wisdom and advice for others."};
      case 5:
        return {score: 40, title: "Satria Wirang", meaning: "May face social hardships or shame. Requires patience."};
      case 6:
        return {score: 50, title: "Bumi Kepetak", meaning: "Hard workers, but may face a secluded or difficult life."};
      case 7:
        return {score: 20, title: "Lebu Katiup Angin", meaning: "Unstable fortune. Assets may come and go like dust in the wind."};
      default:
        return {score: 0, title: "Unknown", meaning: "Unable to calculate."};
    }
  }
  
  /**
   * Find "Hari Baik" for Wedding
   * (Simplified MVP Logic: Avoid Naas based on combined weton)
   * For MVP: Returns next 3 Saturdays/Sundays that satisfy basic neptu rule
   */
  static findWeddingDates(neptuA: number, neptuB: number): Date[] {
    const dates: Date[] = [];
    let current = new Date();
    current.setDate(current.getDate() + 7); // Start next week
    
    // Finding 3 suitable dates
    while (dates.length < 3) {
      // Only Weekend for MVP
      if (current.getDay() === 0 || current.getDay() === 6) {
        const w = this.getWeton(current);
        // Basic Rule: (Total Neptu A+B + Date Neptu) % 5 !== 0 (Just a sample simplified rule for 'Sanggar Waringin')
        // Real Primbon is complex. We use a placeholder logic:
        // Avoid if Total Neptu is divisible by 5 (Pati)
        const combined = neptuA + neptuB + w.neptu;
        if (combined % 5 !== 0) {
          dates.push(new Date(current));
        }
      }
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }
  
  /**
   * Find "Hari Baik" for Circumcision (Sunatan)
   * Logic: Avoid Pasaran 'Wage' (just as an example of restriction)
   * and ensure combined Neptu is auspicious (e.g., % 3 === 0 'Sri')
   */
  static findCircumcisionDates(birthNeptu: number): Date[] {
    const dates: Date[] = [];
    let current = new Date();
    current.setDate(current.getDate() + 3); // Start soon
    
    while (dates.length < 3) {
      const w = this.getWeton(current);
      
      // Constraint 1: Avoid Wage (often considered 'Panas' for some rituals) - Placeholder logic
      if (w.pasaran !== 'Wage') {
        // Constraint 2: Combined Neptu % 3 should be 0 (Sri - Wealth) or 2 (Ginggang - Change/Growth)
        // This is a simplified interpretation
        const combined = birthNeptu + w.neptu;
        const remainder = combined % 4; // Using Guru (1), Ratu (2), Rog (3), Sempoyong (0/4) cycle for simplifiction
        
        // Let's say we want remainder 1 (Guru) or 2 (Ratu)
        if (remainder === 1 || remainder === 2) {
          dates.push(new Date(current));
        }
      }
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }
  
  /**
   * Get Pranata Mangsa (Javanese Season)
   * Based on solar calendar date ranges
   */
  static getPranataMangsa(date: Date): { name: string; description: string } {
    const day = date.getDate();
    const month = date.getMonth() + 1; // 1-12
    
    // Simple checks. Order matters.
    if ((month === 6 && day >= 23) || (month === 7) || (month === 8 && day <= 2))
      return {name: "Kasa", description: "First Season. Farmers burn dry stalks. Dry season begins."};
    
    if ((month === 8 && day >= 3) || (month === 8 && day <= 25))
      return {name: "Karo", description: "Second Season. Dry earth, mango trees blossom."};
    
    if ((month === 8 && day >= 26) || (month === 9 && day <= 18))
      return {name: "Kakatiga", description: "Third Season. Harvest logic. Wells start to dry."};
    
    if ((month === 9 && day >= 19) || (month === 10 && day <= 13))
      return {name: "Kapat", description: "Fourth Season. Labuh (transition). Birds hatch."};
    
    if ((month === 10 && day >= 14) || (month === 11 && day <= 9))
      return {name: "Kalima", description: "Fifth Season. Rain begins. Farmers start planting."};
    
    if ((month === 11 && day >= 10) || (month === 12 && day <= 22))
      return {name: "Kanem", description: "Sixth Season. Heavy rains. Fruits ripen."};
    
    if ((month === 12 && day >= 23) || (month === 1) || (month === 2 && day <= 3))
      return {name: "Kapitu", description: "Seventh Season. Peak rainy season. Floods common."};
    
    if ((month === 2 && day >= 4) || (month === 3 && day <= 1))
      return {name: "Kawolu", description: "Eighth Season. Rice paddy focused. Catfish spawn."};
    
    if ((month === 3 && day >= 2) || (month === 3 && day <= 26))
      return {name: "Kasanga", description: "Ninth Season. Paddy turns yellow. Crickets sound."};
    
    if ((month === 3 && day >= 27) || (month === 4 && day <= 19))
      return {name: "Kadasa", description: "Tenth Season. Harvest time. Birds nest."};
    
    if ((month === 4 && day >= 20) || (month === 5 && day <= 12))
      return {name: "Dhesta", description: "Eleventh Season. Dry season approaches. Farmers store grain."};
    
    if ((month === 5 && day >= 13) || (month === 6 && day <= 22))
      return {name: "Saddha", description: "Twelfth Season. Cold dry air. Water recedes."};
    return {name: "Unknown", description: "Outside standard cycle?"};
  }
  
  /**
   * Get all days in a specific Gregorian month with Javanese metadata
   */
  static getDaysInMonth(year: number, month: number) {
    const days: (WetonData & { date: Date; isHariBaik: boolean })[] = [];
    // month is 0-indexed in JS
    const date = new Date(year, month, 1);
    
    while (date.getMonth() === month) {
      const d = new Date(date);
      const weton = this.getWeton(d);
      days.push({
        ...weton,
        date: d,
        isHariBaik: this.isHariBaik(weton.neptu)
      });
      date.setDate(date.getDate() + 1);
    }
    
    return days;
  }
  
  /**
   * Determine if a day is "Hari Baik" (Auspicious)
   * Simplified logic: Neptu >= 10 and not divisible by 5
   */
  static isHariBaik(neptu: number): boolean {
    return neptu >= 10 && neptu % 5 !== 0;
  }
}
