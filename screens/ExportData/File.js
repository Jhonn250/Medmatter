export const MakeFile = ({medicalList}) => {
    console.log(medicalList);

    let name = 4;
    // console.log(medicalList);
    // console.log('si')
    let html =
        `
        <html>
            <body>
                    <h2 style="font-family: monospace">${name}</h2>
                    <h3>Fecha de Nacimiento: </h3>
                    <h4>${medicalList.birthDate}</h4>
                    <h1 id="tae">bebe</h1>
                    <h3>Sexo:</h3>
                    <h3>Raza:</h3>
                    <h3>Tipo de Sangre:</h3>
                    <h3>Estatura:</h3>
                    <h3>Hipertensi&oacute;n Arterial:</h3>
                    <h3>Fumador:</h3>

                    <hr size="2px" color="black" />
                    <h2>Perfil M&eacute;dico</h2>
                    <hr size="2px" color="black" />

                    <h2>Alergias</h2>
                    <h2>Discapacidades</h2>
                    <h2>Cirug&iacute;as</h2>
                    <h2>Condiciones M&eacute;dicas</h2>

                    <h2 style="background-color: black; color: #ffffff; height: 50px; text-align:justify;">Medicamentos</h2>

                    <h2 style="background-color: black; color: #ffffff; height: 50px; text-align:justify;">Tracking</h2>

                    <h2 style="background-color: black; color: #ffffff; height: 50px; text-align:justify;">Vacunas y Protecciones</h2>

                    <h2 style="background-color: black; color: #ffffff; height: 50px; text-align:justify;">Citas M&eacute;dicas</h2>
            </body>
        </html>
`
        ;

    return html
}

