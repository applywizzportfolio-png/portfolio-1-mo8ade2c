import { useState, useEffect } from 'react';

export interface PortfolioData {
  personal: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
  socialLinks: {
    linkedin: string;
    github: string;
    twitter: string;
    leetcode: string;
    hackerrank: string;
    portfolio: string;
  };
  summary: string;
  targetRole?: string;
  skills: string[];
  experiences: Array<{
    id: string;
    title: string;
    company: string;
    period: string;
    bullets: string;
  }>;
  educations: Array<{
    id: string;
    degree: string;
    institution: string;
    year: string;
    grade: string;
  }>;
  projects: Array<{
    title: string;
    description: string;
    techStack: string[];
    link?: string;
    thumbnail?: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    link?: string;
  }>;
}

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch from the local JSON file managed by the builder
        const response = await fetch('/portfolioData.json');
        if (!response.ok) throw new Error('Failed to load portfolio data');
        const json = await response.json();
        
        // --- Normalization ---
        const normalized: PortfolioData = {
          ...json,
          experiences: (json.experiences || []).map((exp: any) => ({
            ...exp,
            title: exp.title || exp.role || 'Professional Role',
            bullets: exp.bullets || exp.desc || exp.description || ''
          })),
          projects: (json.projects || []).map((proj: any) => ({
            ...proj,
            title: proj.title || proj.name || 'Project',
            description: proj.description || proj.desc || '',
            techStack: Array.isArray(proj.techStack) ? proj.techStack : (Array.isArray(proj.tech) ? proj.tech : []),
            link: proj.link || proj.url || proj.github || ''
          })),
          certifications: (json.certifications || []).map((cert: any) => ({
            ...cert,
            name: cert.name || '',
            issuer: cert.issuer || '',
            date: cert.date || '',
            link: cert.link || cert.url || ''
          }))
        };
        
        setData(normalized);
      } catch (err: any) {
        console.error('Error fetching portfolio data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    
    // Listen for custom refresh events from the parent builder
    const handleRefresh = () => {
      fetchData();
    };
    window.addEventListener('portfolio-refresh', handleRefresh);
    return () => window.removeEventListener('portfolio-refresh', handleRefresh);
  }, []);

  return { data, loading, error };
}
