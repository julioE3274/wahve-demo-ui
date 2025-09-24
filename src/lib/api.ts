const API_URL = import.meta.env.PUBLIC_API_URL || `https://wahve-demo-backend.onrender.com/`;

export async function getScore(jobRanking: string[], applicantRanking: string[]) {
    const params = new URLSearchParams();

    jobRanking.forEach(item => params.append('jobTraitRanking', item));
    applicantRanking.forEach(item => params.append('applicantTraitRanking', item));

    const response = await fetch(`${API_URL}?${params.toString()}`);

    return response.json();
}