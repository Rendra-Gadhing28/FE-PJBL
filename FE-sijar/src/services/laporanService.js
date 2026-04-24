import axios from "axios";
const API_URL = "http://localhost:8000/api/laporan";

export const getLaporanData = async (filters)=>{
    try {
        const response = await axios.get(`${API_URL}/laporan/data`, {
         params: filters,
         headers: {
         Authorization: `Bearer ${localStorage.getItem('token')}`}
        });
        if(response.status === 200){
            return response.data;
        }
    } catch (error) {
        console.error("Error fetching laporan data:", error);
        throw error;
    }
}

export const downloadExcel = async(filters)=>{
    try{
        const response = await axios.get(`${API_URL}/laporan/excel`,{
            params: filters,
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            responseType: 'blob'
        });

        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'laporan.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch(err){
        console.error('error downloading excel:', err);
    }
}
export const downloadPdf = async(filters)=>{
    try{
        const response = await axios.get(`${API_URL}/laporan/pdf`,{
            params: filters,
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            responseType: 'blob'
        });

        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'laporan.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch(err){
        console.error('error downloading pdf:', err);
    }
}

export const previewPdf = async(filters)=>{
    const queryParams = new URLSearchParams(filters).toString();
    window.open(`${API_URL}/laporan/pdf?${queryParams}`, '_blank');
}