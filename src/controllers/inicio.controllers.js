

export const getInicio = async (req, res) => {
    try {
    // Pasar los datos a la vista `inicio.ejs`
    res.render("inicio", { title: "Inicio folder Inmel"});
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        res.status(500).json({ message: 'Hay un error', error: error.message });
    }
};
