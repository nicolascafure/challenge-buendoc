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
  