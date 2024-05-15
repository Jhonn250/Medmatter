import { Text, LogBox } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Layout from '../../components/Layout.js'
import GoBack from '../../components/GoBack.js'
import styles from './ExportDataStyle.js'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import { Box, Button, Center, Checkbox, HStack, PresenceTransition, ScrollView, VStack } from 'native-base'
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { manipulateAsync } from 'expo-image-manipulator';
import { Asset } from 'expo-asset';
import ExportDataOption from '../../components/ExportDataOption.js'

import { getMedicalProfile, getAllergies, getConditions, getLimitations, getSurgeries } from '../../util/api/medical.js'
import { getDrugs } from '../../util/api/drugs.js'
import { getAppointments } from '../../util/api/appointments.js'
import { getWeight, getBlood, getCholesterol, getGlycemia, getTemperature } from '../../util/api/tracking.js'
import { getVaccines } from '../../util/api/vaccine.js'
import { GetHypertension, GetRace, GetSex, GetSmoker, GetTypeofBlood } from '../../components/ConvertToTypePlain.js'
import { GetLimitation } from '../../components/ConvertToTypePlain.js'
import info from '../../util/info/info.js'
import UserContext from "../../components/contexts/UserContext.js";
import { getFixedDate } from '../../util/other/GetFormattedDate';

const ExportData = () => {
    LogBox.ignoreAllLogs();
    const { users } = useContext(UserContext);
    const [groupValues, setGroupValues] = React.useState([]);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isOpen2, setIsOpen2] = React.useState(false);
    const [isOpen3, setIsOpen3] = React.useState(false);
    const [isOpen4, setIsOpen4] = React.useState(false);
    const [isOpen5, setIsOpen5] = React.useState(false);

    const [medicalList, setMedicalList] = useState([])
    const [conditionsList, setConditionsList] = useState([])
    const [allergyList, setAllergyList] = useState([])
    const [diseaseList, setDiseaseList] = useState([])
    const [surgeriesList, setSurgeriesList] = useState([])
    const [drugList, setDrugList] = useState([])
    const [appointmentList, setAppointmentList] = useState([])
    const [vaccineList, setVaccineList] = useState([])
    const [weightList, setWeightList] = useState([])
    const [bloodList, setBloodList] = useState([])
    const [cholesterolList, setCholesterolList] = useState([])
    const [glycemiaList, setGlycemiaList] = useState([])

    const loadAll = () => {
        getMedicalProfile()
            .then((res) => res.json())
            .then((data) => setMedicalList(data))
            .catch((err) => console.log(err));

        getConditions()
            .then((res) => res.json())
            .then((data) => setConditionsList(data))
            .catch((err) => console.log(err));

        getAllergies()
            .then((res) => res.json())
            .then((data) => setAllergyList(data))
            .catch((err) => console.log(err));

        getLimitations()
            .then((res) => res.json())
            .then((data) => setDiseaseList(data))
            .catch((err) => console.log(err));

        getSurgeries()
            .then((res) => res.json())
            .then((data) => setSurgeriesList(data))
            .catch((err) => console.log(err));
        getDrugs()
            .then((res) => res.json())
            .then((data) => setDrugList(data))
            .catch((err) => console.log(err));
        getAppointments()
            .then((res) => res.json())
            .then((data) => setAppointmentList(data))
            .catch((err) => console.log(err));
        getVaccines()
            .then((res) => res.json())
            .then((data) => setVaccineList(data))
            .catch((err) => console.log(err));
        getWeight()
            .then((res) => res.json())
            .then((data) => setWeightList(data))
            .catch((err) => console.log(err));
        getBlood()
            .then((res) => res.json())
            .then((data) => setBloodList(data))
            .catch((err) => console.log(err));
        getCholesterol()
            .then((res) => res.json())
            .then((data) => setCholesterolList(data))
            .catch((err) => console.log(err));
        getGlycemia()
            .then((res) => res.json())
            .then((data) => setGlycemiaList(data))
            .catch((err) => console.log(err));
    }
    useEffect(() => {
        loadAll();
        weightList.sort((a, b) => (a.dateTime > b.dateTime) ? 1 : (a.dateTime === b.dateTime) ? ((a.value > b.value) ? 1 : -1) : -1)
        bloodList.sort((a, b) => (a.dateTime > b.dateTime) ? 1 : (a.dateTime === b.dateTime) ? ((a.value > b.value) ? 1 : -1) : -1)
        glycemiaList.sort((a, b) => (a.dateTime > b.dateTime) ? 1 : (a.dateTime === b.dateTime) ? ((a.value > b.value) ? 1 : -1) : -1)
        cholesterolList.sort((a, b) => (a.dateTime > b.dateTime) ? 1 : (a.dateTime === b.dateTime) ? ((a.value > b.value) ? 1 : -1) : -1)
    }, [])


    let generatePDF = async () => {
        const file = await printToFileAsync({
            html: await createHTML(),
            margins: {
                left: 30,
                top: 30,
                right: 30,
                bottom: 30,
            },
            base64: false,
        })
        await shareAsync(file.uri);
    }
    const createHTML = async () => {
        const asset = Asset.fromModule(require('../../assets/medmatterlogo.png'));
        const image = await manipulateAsync(asset.localUri ?? asset.uri, [], { base64: true });
        var allergyInfo = '';
        var diseaseInfo = '';
        var surgeriesInfo = '';
        var conditionsInfo = '';
        var table = '';
        var basicInfo = '';
        var vaccineInfo = '';
        var appointmentInfo = '';
        var weightInfo = '';
        var bloodInfo = '';
        var glycemiaInfo = '';
        var cholesterolInfo = '';

        basicInfo = basicInfo + `
        <div class="b">
        <p style=margin:0;>Nombre:</p>
        </div>
        <div class="c">
        <p style=margin:0;>${users.firstName} ${users.lastName}</p>
        </div>
        <div class="b">
        <p style=margin:0;>Fecha de Nacimiento:</p>
        </div>
        <div class="c">
        <p style=margin:0;>${getFixedDate(medicalList.birthDate)}</p>
        </div>
        <div class="b">
        <p style=margin:0;>Sexo:</p>
        </div>
        <div class="c">
        <p style=margin:0;>${GetSex(medicalList.sex)}</p>
        </div>
        <div class="b">
        <p style=margin:0;>Raza:</p>
        </div>
        <div class="c">
        <p style=margin:0;>${GetRace(medicalList.race)}</p>
        </div>
        <div class="b">
        <p style=margin:0;>Tipo de Sangre:</p>
        </div>
        <div class="c">
        <p style=margin:0;>${GetTypeofBlood(medicalList.bloodType)}</p>
        </div>
        <div class="b">
        <p style=margin:0;>Estatura:</p>
        </div>
        <div class="c">
        <p style=margin:0;>${medicalList.height} m</p>
        </div>
        <div class="b">
        <p style=margin:0;>¿Hipertensi&oacute;n?:</p>
        </div>
        <div class="c">
        <p style=margin:0;>${GetHypertension(medicalList.hasHypertension)}</p>
        </div>
        <div class="b">
        <p style=margin:0;>¿Fumador?:</p>
        </div>
        <div class="c">
        <p style=margin:0>${GetSmoker(medicalList.isSmoker)}</p>
        </div>
`

        allergyList.forEach(element => {
            allergyInfo = allergyInfo + `
            <tr>
                <td>${element.name}</td>
                <td>${element.symptoms}</td>
            </tr>`
        });
        diseaseList.forEach(element => {
            element.type === 8 ? (element.type = element.description) : (element.type = GetLimitation(element.type))
            diseaseInfo = diseaseInfo + `
            <tr>
                <td>${element.type}</td>
            </tr>`
        });
        surgeriesList.forEach(element => {
            element.doctor === null ? (element.doctor = info.defaultText) : (null)
            surgeriesInfo = surgeriesInfo + `
            <tr>
                <td>${element.name}</td>
                <td>${getFixedDate(element.date)}</td>
                <td>${element.place}</td>
                <td>${element.doctor}</td>
            </tr>`
        });
        conditionsList.forEach(element => {
            element.doctor === null ? (element.doctor = info.defaultText) : (null)
            element.majorComplications === null ? (element.majorComplications = info.defaultText) : (null)
            element.minorComplications === null ? (element.minorComplications = info.defaultText) : (null)
            element.endDate === null ? (element.endDate = info.defaultText) : (element.endDate = getFixedDate(element.endDate))
            conditionsInfo = conditionsInfo + `
            <tr>
                <td>${element.name}</td>
                <td>${element.description}</td>
                <td>${getFixedDate(element.startDate)}</td>
                <td>${element.endDate}</td>
                <td>${element.majorComplications}</td>
                <td>${element.minorComplications}</td>
            </tr>`
        });

        drugList.forEach(element => {
            element.isTaking ? (element.isTaking = 'Si') : (element.isTaking = 'No');
            element.stoppedTaking === null ? (element.stoppedTaking = info.defaultText) : (getFixedDate(element.stoppedTaking))
            table = table + `
            <tr>
                <td>${element.name}</td>
                <td>${element.dose}</td>
                <td>${element.isTaking}</td>
                <td>${getFixedDate(element.startedTaking)}</td>
                <td>${element.stoppedTaking}</td>
                <td>${element.timesDay}</td>
                <td>${element.timesWeek}</td>
                <td>${element.remainingUnits}</td>
            </tr>`
        });

        weightList.forEach(element => {
            weightInfo = weightInfo + `
            <tr>
                <td>${element.value}</td>
                <td>${getFixedDate(element.dateTime)}</td>
            </tr>`
        });
        bloodList.forEach(element => {
            bloodInfo = bloodInfo + `
            <tr>
                <td>${element.value}</td>
                <td>${getFixedDate(element.dateTime)}</td>
            </tr>`
        });
        glycemiaList.forEach(element => {
            glycemiaInfo = glycemiaInfo + `
            <tr>
                <td>${element.value}</td>
                <td>${getFixedDate(element.dateTime)}</td>
            </tr>`
        });

        cholesterolList.forEach(element => {
            cholesterolInfo = cholesterolInfo + `
            <tr>
                <td>${element.value}</td>
                <td>${getFixedDate(element.dateTime)}</td>
            </tr>`
        });

        vaccineList.forEach(element => {
            element.vaccinationDates === null ? (element.vaccinationDates = info.defaultText) : (null);
            element.secondaryEffects === null ? (element.secondaryEffects = info.defaultText) : (null)
            vaccineInfo = vaccineInfo + `
            <tr>
                <td>${element.name}</td>
                <td>${element.vaccinationDates}</td>
                <td>${element.secondaryEffects}</td>

            </tr>`
        });


        appointmentList.forEach(element => {
            element.doctor === null ? (element.doctor = info.defaultText) : (null);
            element.extraDetails === null ? (element.extraDetails = info.defaultText) : (null)
            vaccineInfo = vaccineInfo + `
            <tr>
                <td>${element.place}</td>
                <td>${getFixedDate(element.date)}</td>
                <td>${element.doctor}</td>
                <td>${element.extraDetails}</td>
            </tr>`
        });


        let html =`
            <html>
                <img
                    src="data:image/jpeg;base64,${image.base64}"
                    style="width: 250px;" />
                <br>
                    <br>
                        <style>
                            table {
                                font - family: arial, sans-serif;
                            border-collapse: collapse;
                            width: 100%;
            }

                            td, th {
                                border: 1px solid #dddddd;
                            text-align: left;
                            padding: 8px;
            }

                            tr:nth-child(even) {
                                background - color: #dddddd;
            }
                            div.a {
                                margin: auto;
                            text-align: center;
            }
                            div.b {
                                font - size: 15px;
                            font-weight: bold;
                            margin: 0;
            }
                            div.c {
                                font - size: 15px;
                            font-weight: normal;
                            margin: 0;
            }
                        </style>
                        <body>
                            ${basicInfo}
                            <div class="a">
                                <h3 style="background-color: black; color: #ffffff; height: 30px; margin: auto;">Perfil M&eacute;dico</h3>
                            </div>
                            <h3 style="background-color: #808080; color: #ffffff; height: 20px; text-align:justify;">Alergias</h3>
                            <table>
                                <tr>
                                    <th>Nombre de alergia</th>
                                    <th>Sintomas</th>
                                </tr>
                                ${allergyInfo}
                            </table>
                            <h3 style="background-color: #808080; color: #ffffff; height: 20px; text-align:justify;">Discapacidades</h3>
                            <table>
                                <tr>
                                    <th>Tipo de discapacidad</th>
                                </tr>
                                ${diseaseInfo}
                            </table>
                            <h3 style="background-color: #808080; color: #ffffff; height: 20px; text-align:justify;">Cirug&iacute;as</h3>
                            <table>
                                <tr>
                                    <th>Nombre de la cirugia</th>
                                    <th>Fecha</th>
                                    <th>Lugar</th>
                                    <th>Doctor</th>
                                </tr>
                                ${surgeriesInfo}
                            </table>
                            <h3 style="background-color: #808080; color: #ffffff; height: 20px; text-align:justify;">Condiciones M&eacute;dicas</h3>
                            <table>
                                <tr>
                                    <th>Nombre de la condici&oacute;n</th>
                                    <th>Descripci&oacute;n</th>
                                    <th>Fecha inicio</th>
                                    <th>Fecha fin</th>
                                    <th>Complicaciones Mayores</th>
                                    <th>Complicaciones Menores</th>
                                </tr>
                                ${conditionsInfo}
                            </table>

                            <div class="a">
                                <h3 style="background-color: black; color: #ffffff; height: 30px">Medicamentos</h3>
                            </div>
                            <table>
                                <tr>
                                    <th>Medicamento</th>
                                    <th>Dosis</th>
                                    <th>¿Se consume?</th>
                                    <th>Fecha de inicio</th>
                                    <th>Fecha de fin</th>
                                    <th>Veces por dia</th>
                                    <th>Veces por semana</th>
                                    <th>Unidades restantes</th>
                                </tr>
                                ${table}
                            </table>
                            <div class="a">
                                <h3 style="background-color: black; color: #ffffff; height: 30px">Tracking</h3>
                            </div>
                            <h3 style="background-color: #808080; color: #ffffff; height: 20px; text-align:justify;">Peso</h3>
                            <table>
                                <tr>
                                    <th>Valor</th>
                                    <th>Fecha</th>
                                </tr>
                                ${weightInfo}
                            </table>
                            <h3 style="background-color: #808080; color: #ffffff; height: 20px; text-align:justify;">Presi&oacute;n Sangrinea</h3>
                            <table>
                                <tr>
                                    <th>Valor</th>
                                    <th>Fecha</th>
                                </tr>
                                ${bloodInfo}
                            </table>
                            <h3 style="background-color: #808080; color: #ffffff; height: 20px; text-align:justify;">Az&uacute;car (Glucosa)</h3>
                            <table>
                                <tr>
                                    <th>Valor</th>
                                    <th>Fecha</th>
                                </tr>
                                ${glycemiaInfo}
                            </table>
                            <h3 style="background-color: #808080; color: #ffffff; height: 20px; text-align:justify;">Colesterol</h3>
                            <table>
                                <tr>
                                    <th>Valor</th>
                                    <th>Fecha</th>
                                </tr>
                                ${cholesterolInfo}
                            </table>


                            <div class="a">
                                <h3 style="background-color: black; color: #ffffff; height: 30px">Vacunas y Protecciones</h3>
                            </div>
                            <table>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Fecha de vacunaci&oacute;n</th>
                                    <th>Efectos Secundarios</th>
                                </tr>
                                ${vaccineInfo}
                            </table>
                            <div class="a">
                                <h3 style="background-color: black; color: #ffffff; height: 30px">Citas M&eacute;dicas</h3>
                            </div>
                            <table>
                                <tr>
                                    <th>Lugar</th>
                                    <th>Fecha de cita</th>
                                    <th>Doctor</th>
                                    <th>Detalles Extra</th>
                                </tr>
                                ${appointmentInfo}
                            </table>
                        </body>
                    </html>
                    `
                    ;
                    return html;
    }


                    return (
                    <Layout>
                        <GoBack />
                        <HStack>
                            <Icon name='download' size={30} />
                            <Text style={{ fontFamily: "RBold", fontSize: 20, marginBottom: '10%', marginLeft: '3%' }}>Exportar Información</Text>
                        </HStack>
                        <Text style={styles.main}>Datos a exportar:</Text>
                        <ScrollView style={{ marginTop: 15 }}>
                            <VStack space={1}>
                                <ExportDataOption
                                    backgroundColor="light.100"
                                    text="Perfil Médico"
                                    icon="heart"
                                    setIsOpen={setIsOpen}
                                    isOpen={isOpen}
                                />
                                <Box marginLeft={'1%'}>
                                    <PresenceTransition visible={isOpen} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 250 } }}>
                                        {
                                            isOpen &&
                                            <>
                                                <Checkbox.Group onChange={setGroupValues} value={groupValues}>
                                                    <Checkbox colorScheme="info" size={'sm'} value='1'>Alergias</Checkbox>
                                                    <Checkbox colorScheme="info" size={'sm'} value='2'>Discapacidades</Checkbox>
                                                    <Checkbox colorScheme="info" size={'sm'} value='3'>Cirugias</Checkbox>
                                                    <Checkbox colorScheme="info" size={'sm'} value='4'>Condiciones Médicas</Checkbox>
                                                </Checkbox.Group>
                                                {/* <Test /> */}
                                            </>
                                        }
                                    </PresenceTransition>
                                </Box>

                                <ExportDataOption
                                    backgroundColor="light.100"
                                    text="Medicamentos"
                                    icon="pill"
                                    setIsOpen={setIsOpen2}
                                    isOpen={isOpen2}
                                />
                                <PresenceTransition visible={isOpen2} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 250 } }}>
                                    {
                                        isOpen2 &&
                                        <Checkbox.Group onChange={setGroupValues} value={groupValues}>
                                            <Checkbox colorScheme="info" size={'sm'} value='1'>Alergias</Checkbox>
                                            <Checkbox colorScheme="info" size={'sm'} value='2'>Discapacidades</Checkbox>
                                            <Checkbox colorScheme="info" size={'sm'} value='3'>Cirugias</Checkbox>
                                            <Checkbox colorScheme="info" size={'sm'} value='4'>Condiciones Médicas</Checkbox>
                                        </Checkbox.Group>
                                    }
                                </PresenceTransition>
                                <ExportDataOption
                                    backgroundColor="light.100"
                                    text="Tracking"
                                    icon="chart-line-variant"
                                />
                                <ExportDataOption
                                    backgroundColor="light.100"
                                    text="Vacunas y Protecciones"
                                    icon="needle"
                                />
                                <ExportDataOption
                                    backgroundColor="light.100"
                                    text="Citas Médicas"
                                    icon="clock-time-four"
                                />
                            </VStack>
                        </ScrollView>

                        <Button height={'7%'} borderRadius={'2xl'} colorScheme={'darkBlue'} onPress={generatePDF}>Generar PDF</Button>
                    </Layout >

                    )
}

                    export default ExportData