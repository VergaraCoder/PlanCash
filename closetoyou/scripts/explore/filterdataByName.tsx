

export const FilterByname = (data:any,valueInput:any,setContact:any) => {
    console.log(data);
    
    console.log(valueInput);
    
    return data.filter((item:any)=>setContact(item.includes(valueInput)));
}