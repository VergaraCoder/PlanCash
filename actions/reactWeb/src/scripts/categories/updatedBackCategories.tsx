export const UpdatedBackEndCategories = async (data: any, setError: any) => {
    try {
        const idBudgetInString: string | any = localStorage.getItem("budGetReal");
        const amount = Number(data.destinado);
        const idCategory = data.idCategory;
        const idBudGet = Number(JSON.parse(idBudgetInString));

        console.log("Iniciando petición al backend...");

        const response: Response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/categories/${idCategory}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    dateStart: data.dateStart,
                    dateEnd: data.dateEnd,
                    amount: amount,
                    idBudget: idBudGet,
                }),
                credentials: "include",
            }
        );

        const dataResponse = await response.json(); // Leer respuesta una sola vez.

        if (!response.ok) {
            console.error("Error en la petición:", dataResponse);
            throw new Error(dataResponse.message || "Error desconocido en backend");
        }

        console.log("Respuesta exitosa del backend:", dataResponse);
        return true;
    } catch (err: any) {
        console.error("Error en UpdatedBackEndCategories:", err.message);
        setError(err.message);
        setTimeout(() => setError(""), 4700);
        return false;
    }
};
