export async function PatchProfessional(data: any) {
    const formData = new FormData();
    formData.append("profile_image", data.profile_image.originFileObj);
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    const response = await fetch(
      `http://challenge.radlena.com/api/v1/professionals/${data.id}/`,
      {
        method: "PATCH",
        body: formData,
      }
    );
    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("El mail ya fue ingresado en la data");
      } else {
        throw new Error("Recuperando lista de profesionales");
      }
    }
    return response.json();
  }
  

  
export async function deleteProfesional(id:number){
    await fetch(`http://challenge.radlena.com/api/v1/professionals/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: null
    })
  }
  
  export async function fetchProfessionals(pageN:number){
    const response = await fetch(`http://challenge.radlena.com/api/v1/professionals/?page=${pageN}`)
    if(!response.ok){
      throw new Error ("Recuperando lista de profesionales")
    }
    return response.json()
  }
  

  
export async function fetchLanguajes(){
    const response = await fetch(`http://challenge.radlena.com/api/v1/languages/`)
    if(!response.ok){
      throw new Error ("Recuperando lista de lenguajes")
    }
    return response.json()
  }
  
  

  
 export async function AddProfessional(data:any) {
    const formData = new FormData();
    formData.append("profile_image", data.profile_image.originFileObj)
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append("email", data.email)
    const response= await fetch("http://challenge.radlena.com/api/v1/professionals/",{
  
      method:"POST",
      body: formData
    });
    if(!response.ok){
     
    if(response.status===400){
      throw new Error("El mail ya fue ingresado en la data");
    }else{
      throw new Error ("Recuperando lista de profesionales")}
    }
    return response.json()
  }
  
  
  export async function AddLenguaje(data:any) {
  
    const response= await fetch("http://challenge.radlena.com/api/v1/professional-languages/",{
  headers:{"Content-type":"application/json"},
      method:"POST",
      body: JSON.stringify(data)
    });
    if(!response.ok){
      throw new Error ("Recuperando lista lenguajes")
    }
    return response.json()
  }
  