# LeadGenTool

> **Real-Time, India-Focused Lead Generation Dashboard**  
> Fetch, enrich, filter and export hundreds of high-quality company leads in one click using Scrape.do’s API.

---

## 🔍 Project Overview
When I searched for Indian companies (Hyderabad, Bangalore, Delhi, etc.) on standard lead-gen platforms, results were sparse or missing—even though India hosts hundreds of relevant businesses across domains. I built **LeadGenTool** to:

- **Fetch & Enrich** up to **500 companies** per query via Scrape.do’s API (bypassing CAPTCHAs & fingerprint checks).  
- **Normalize Records** with:  
  - Company name, industry, location (city, country)  
  - Headcount & revenue  
  - Website URL & official email  
  - AI-powered lead score  
- **Streamline CRM Workflows** with one-click “Add to CRM,” “Mark Contacted,” and “Favorites” buttons.  
- **Provide Dynamic Filters** by industry, location, size (Startup → Large), contact-info availability, and a minimum lead-score slider.  
- **Guide Users** via an animated ProTip slider cycling through 100 contextual best-practice hints.  
- **Handle Scale** with responsive pagination and one-click CSV export.

---

## ⚙️ Tech Stack & Architecture

- **Next.js** & **React** (TypeScript)  
- **Tailwind CSS** for styling  
- **Zustand** for local auth store  
- **Framer Motion** for animations  
- **Scrape.do REST API** for live scraping  
- **Custom Service**:  
  ```ts
  // src/services/ScrapeDoService.ts
  export class ScrapeDoService {
    private apiKey = '47a235cb7f624e5494aea351710118c94555f184a1d';
    private baseUrl = 'https://api.scrape.do';

    async fetchCompanyData(url: string): Promise<any> {
      const query = new URLSearchParams({
        api_key: this.apiKey,
        url,
        render: 'true',
      }).toString();
      const response = await fetch(`${this.baseUrl}?${query}`);
      if (!response.ok) throw new Error(`Scrape.do error: ${response.statusText}`);
      return response.json();
    }

    async getStats(): Promise<any> {
      const query = new URLSearchParams({ api_key: this.apiKey }).toString();
      const response = await fetch(`${this.baseUrl}/stats?${query}`);
      if (!response.ok) throw new Error(`Stats error: ${response.statusText}`);
      return response.json();
    }
  }
Images: 
![image](https://github.com/user-attachments/assets/0a62c8c7-238d-4856-88d4-d17fc53e3534)
![image](https://github.com/user-attachments/assets/ab45a682-7099-4a8f-9476-ab2dfca6ef19)
![image](https://github.com/user-attachments/assets/e63a085c-8238-42ad-81c6-b6511332dd06)
![image](https://github.com/user-attachments/assets/26e90bd0-a0ba-4c41-8245-0863e2cf47f2)
![image](https://github.com/user-attachments/assets/e15216c6-4a43-4fd6-ae30-17bdd7e69a9b)
![image](https://github.com/user-attachments/assets/6149e6c7-3236-49c6-87c2-dd454e7efbbc)
![image](https://github.com/user-attachments/assets/1fc61144-9519-4ed9-bc6a-d0921894f441)
![image](https://github.com/user-attachments/assets/7f413987-e80c-4127-9a80-b9cf019d53b2)
![image](https://github.com/user-attachments/assets/f25885c0-f8e8-4cf4-a152-c05396ec901d)
