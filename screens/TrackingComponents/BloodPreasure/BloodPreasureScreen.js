import {
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Alert,
} from "react-native";
import React, { useState, useEffect } from "react";

import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import RNPickerSelect from 'react-native-picker-select';
import Layout from "../../../components/Layout.js";
import GoBack from "../../../components/GoBack.js";
import { LineChart } from "react-native-chart-kit";
import ModalScreen3 from '../../../components/Modals/ModalScreen3.js';
import { Box, Center, HStack } from 'native-base';
import { getBlood, deleteBlood } from "../../../util/api/tracking.js";
import BloodItem from "./BloodItem.js";
import BloodRegister from "./BloodRegister.js";
import info from "../../../util/info/info.js";
import { isEmpty } from "../../../util/other/validations.js";
import { getFixedDate } from "../../../util/other/GetFormattedDate.js";
import RenderEmptyGraphic from "../../../components/RenderEmptyGraphic.js";

const BloodPreasureScreen = () => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [isModalOpen, setisModalOpen] = useState(false);
    const [weightsList, setWeightsList] = useState([])
    let [dates, setDates] = useState([])
    let [weights, setWeights] = useState([])
    const [filterGraph, setFilterGraph] = useState(undefined)
    const [filterGraphWeekly, setFilterGraphWeekly] = useState(undefined)
    const [filterGraphMonthly, setFilterGraphMonthly] = useState(undefined)
    let allMonths = [];
    let january = [];
    let february = [];
    let march = [];
    let april = [];
    let may = [];
    let june = [];
    let july = [];
    let august = [];
    let september = [];
    let october = [];
    let november = [];
    let december = [];
    let w1 = [];
    let w2 = [];
    let w3 = [];
    let w4 = [];
    let w5 = [];
    let byMonth = [];


    dates.length = 0;
    weights.length = 0;

    const loadWeight = async () => {
        getBlood()
            .then((res) => res.json())
            .then((data) => setWeightsList(data))
            .catch((err) => console.log(err));
        weightsList.sort((a, b) => (a.dateTime > b.dateTime) ? 1 : (a.dateTime === b.dateTime) ? ((a.value > b.value) ? 1 : -1) : -1)
    };


    const loadGraphicWeights = () => {
        try {
            weightsList.sort((a, b) => (a.dateTime > b.dateTime) ? 1 : (a.dateTime === b.dateTime) ? ((a.value > b.value) ? 1 : -1) : -1)
            Object.values(weightsList).forEach(val => {
                dates.push(getFixedDate(val.dateTime))
                weights.push(val.value)
            });

            if (filterGraph === 1) {
                getFilterByAllMonths(filterGraphMonthly, filterGraphWeekly)

            }

            if (filterGraph === 2 && (filterGraphMonthly !== null || filterGraphMonthly !== undefined)) {
                getFilterByMonth(filterGraphMonthly)

            }
            if (filterGraph === 2 && (filterGraphMonthly === null || filterGraphMonthly === undefined)) {
                getFilterByAllMonths();
            }


        } catch (error) {
            console.log(error);
        }
    }

    const getFilterByMonth = (value) => {
        try {
            byMonth.length = 0;
            dates.length = 0;
            weights.length = 0;
            weightsList.forEach((element) => {
                if (element.dateTime.split('/')[0] === value.toString()) {
                    byMonth.push(element);
                }
            })
            byMonth.sort((a, b) => (a.dateTime > b.dateTime) ? 1 : (a.dateTime === b.dateTime) ? ((a.value > b.value) ? 1 : -1) : -1)
            Object.values(byMonth).forEach(val => {
                dates.push(getFixedDate(val.dateTime))
                weights.push(val.value)
            });

        } catch (error) {
            console.log(error);
        }

    }

    const getFilterByWeek = (week, data) => {
        const week1 = ["1", "2", "3", "4", '5', '6', '7'];
        const week2 = ["8", "9", "10", "11", '12', '13', '14'];
        const week3 = ["15", "16", "17", "18", '19', '20', '21'];
        const week4 = ["22", "23", "24", "25", '26', '27', '28'];
        const week5 = ["29", "30", "31"];

        w1.length = 0;
        w2.length = 0;
        w3.length = 0;
        w4.length = 0;
        w5.length = 0;

        data.forEach((element) => {
            if (week1.includes(element.dateTime.split('/')[1])) {
                w1.push(element)
            }
            if (week2.includes(element.dateTime.split('/')[1])) {
                w2.push(element)
            }
            if (week3.includes(element.dateTime.split('/')[1])) {
                w3.push(element)
            }
            if (week4.includes(element.dateTime.split('/')[1])) {
                w4.push(element)
            }
            if (week5.includes(element.dateTime.split('/')[1])) {
                w5.push(element)
            }
        })
        if (week === 1) {
            w1.forEach((element) => {
                weights.push(element.value)
                dates.push(getFixedDate(element.dateTime))
            })
        }
        if (week === 2) {
            w2.forEach((element) => {
                weights.push(element.value)
                dates.push(getFixedDate(element.dateTime))
            })
        }
        if (week === 3) {
            w3.forEach((element) => {
                weights.push(element.value)
                dates.push(getFixedDate(element.dateTime))
            })
        }
        if (week === 4) {
            w4.forEach((element) => {
                weights.push(element.value)
                dates.push(getFixedDate(element.dateTime))
            })
        }
        if (week === 5) {
            w5.forEach((element) => {
                weights.push(element.value)
                dates.push(getFixedDate(element.dateTime))
            })
        }

    }
    const chooseWeek = (month, week) => {
        try {
            let auxData = []
            auxData.length === 0;
            if (month == 1) {
                auxData = january;
            }
            if (month == 2) {
                auxData = february;
            }
            if (month == 3) {
                auxData = march
            }
            if (month == 4) {
                auxData = april
            }
            if (month == 5) {
                auxData = may
            }
            if (month == 6) {
                auxData = june
            }
            if (month == 7) {
                auxData = july
            }
            if (month == 8) {
                auxData = august
            }
            if (month == 9) {
                auxData = september
            }
            if (month == 10) {
                auxData = october
            }
            if (month == 11) {
                auxData = november
            }
            if (month == 12) {
                auxData = december
            }
            getFilterByWeek(week, auxData)

        } catch (error) {
            console.log(error)

        }
    }

    const getFilterByAllMonths = (month, week) => {
        weightsList.sort((a, b) => (a.dateTime > b.dateTime) ? 1 : (a.dateTime === b.dateTime) ? ((a.value > b.value) ? 1 : -1) : -1)
        const aux = 0;
        allMonths.length = 0;
        january.length = 0;
        february.length = 0;
        march.length = 0;
        april.length = 0;
        may.length = 0;
        june.length = 0;
        july.length = 0;
        august.length = 0;
        september.length = 0;
        october.length = 0;
        november.length = 0;
        december.length = 0;
        dates.length = 0;
        weights.length = 0;

        weightsList.forEach((element) => {
            if (element.dateTime.split('/')[0] === '1') {
                january.push(element);
            }
            if (element.dateTime.split('/')[0] === '2') {
                february.push(element);
            }
            if (element.dateTime.split('/')[0] === '3') {
                march.push(element);
            }
            if (element.dateTime.split('/')[0] === '4') {
                april.push(element);
            }
            if (element.dateTime.split('/')[0] === '5') {
                may.push(element);
            }
            if (element.dateTime.split('/')[0] === '6') {
                june.push(element);
            }
            if (element.dateTime.split('/')[0] === '7') {
                july.push(element);
            }
            if (element.dateTime.split('/')[0] === '8') {
                august.push(element);
            }
            if (element.dateTime.split('/')[0] === '9') {
                september.push(element);
            }
            if (element.dateTime.split('/')[1] === '10') {
                october.push(element);
            }
            if (element.dateTime.split('/')[1] === '11') {
                november.push(element);
            }
            if (element.dateTime.split('/')[1] === '12') {
                december.push(element);
            }
        });
        if (month !== null && month !== undefined) {
            if (week !== null && week !== undefined) {
                chooseWeek(month, week)
            }
        } else {
            january = january.slice(-1);
            january.length === 0 ? january = aux : january = january[0].value

            february = february.slice(-1);
            february.length === 0 ? february = aux : february = february[0].value

            march = march.slice(-1);
            march.length === 0 ? march = aux : march = march[0].value

            april = april.slice(-1);
            april.length === 0 ? april = aux : april = april[0].value

            may = may.slice(-1);
            may.length === 0 ? may = aux : may = may[0].value

            june = june.slice(-1);
            june.length === 0 ? june = aux : june = june[0].value

            july = july.slice(-1);
            july.length === 0 ? july = aux : july = july[0].value

            august = august.slice(-1);
            august.length === 0 ? august = aux : august = august[0].value

            september = september.slice(-1);
            september.length === 0 ? september = aux : september = september[0].value

            october = october.slice(-1);
            october.length === 0 ? october = aux : october = october[0].value

            november = november.slice(-1);
            november.length === 0 ? november = aux : november = november[0].value

            december = december.slice(-1);
            december.length === 0 ? december = aux : december = december[0].value

            weights.push(january, february, march, april, may, june, july, august, september, october, november, december)

            info.filterGraphMonthly.forEach((element) => {
                dates.push(element.label)
            });

        }




    }

    useEffect(() => {
        loadWeight();
        if (filterGraph === null || filterGraph === undefined) {
            setFilterGraphMonthly(null);
            setFilterGraphWeekly(null);
        }
        if (filterGraphMonthly === null) {
            setFilterGraphWeekly(null);
        }
        if (filterGraph === 1) {
            setFilterGraphMonthly(null);
        }
    }, []);



    const reload = () => {
        loadWeight();
    }

    const handleDelete = (id) => {
        Alert.alert('¿Desea eliminar?', '', [
            { text: 'Si', onPress: () => deleteConfirmation(id) },
            { text: 'No' }
        ]);
    };

    const deleteConfirmation = async (id) => {
        const res = await deleteBlood(id);

        if (res === true) {
            Alert.alert('Eliminado con éxito', '', [
                { text: 'Ok' }
            ]);
            await loadWeight();
        }
        if (res === false || res === null) {
            Alert.alert('No se pudo eliminar', '', [
                { text: 'Ok' }
            ]);
        }
    }


    //CHART/////////////////////////////////////////////////////////////////
    const data = {
        labels: dates,
        datasets: [
            {
                data: weights,
                color: (opacity = 1) => `rgba(255, 255, 220, ${opacity})`, // optional   
                strokeWidth: 4, // optional
            },
        ],
        legend: ["Presión Sistolica"],
    };

    const chartConfig = {
        backgroundGradientFrom: "#858585",
        backgroundGradientTo: "#4d4d4d",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

        style: {
            borderRadius: 16,
        },
        propsForDots: {
            r: "3",
            strokeWidth: "3",
            stroke: "#FFFFFF",
        },
    };
    const bezier = {
        style: {
            marginVertical: 8,
            borderRadius: 10,
        },
    };
    //////////////////////////////////////////////////////////////////////


    const renderItem = ({ item }) => {
        return <BloodItem list={item} handleDelete={handleDelete} reload={reload} />;
    };

    loadGraphicWeights();





    return (
        <Layout>
            <HStack space={"84%"} justifyContent="center">
                <GoBack />
                <TouchableOpacity onPress={() => setisModalOpen(!isModalOpen)}>
                    <Icon name="plus" size={40} />
                </TouchableOpacity>
            </HStack>
            <HStack>
            <Icon name="water-check" size={30} />
                <Text style={{ fontFamily: "RBold", fontSize: 20, marginBottom: '10%', marginLeft: '3%' }}>Presión Sanguinea</Text>
            </HStack>

            <Box height={'40%'}>
                {isEmpty(weightsList) ? (<Text style={{ fontFamily: 'REL', alignSelf: 'center', margin: 20 }}>¡No se han registado datos!</Text>) :
                    (
                        <>
                            <ScrollView alwaysBounceVertical={false} style={{ flexDirection: 'row' }}>
                                {
                                    data.datasets[0].data.length === 0 ? (<Box width={'181%'}><RenderEmptyGraphic /></Box>
                                    ) : (<LineChart
                                        data={data}
                                        width={900}
                                        height={260}
                                        chartConfig={chartConfig}
                                        bezier={bezier}
                                        yAxisSuffix={""}
                                    />)
                                }
                            </ScrollView>
                        </>)}
            </Box>

            {
                !isEmpty(weightsList) &&
                (<>


                    <Text style={styles.allTexts}>Filtrar por: </Text>
                    <HStack space={2}>
                        <Box marginTop={'1%'} marginBottom={'1%'} width={'32%'}>
                            <Center><RNPickerSelect
                                placeholder={info.placeholder}
                                Icon={() => {
                                    return <Icon name="chevron-down" size={30} />
                                }}
                                style={{
                                    ...styles,
                                }}
                                onValueChange={(value) => setFilterGraph(value)}
                                items={info.filterGraph}
                            /></Center>
                        </Box>



                        {filterGraph === 1 &&
                            <>
                                <Box marginTop={'1%'} marginBottom={'1%'} width={'32%'}>
                                    <Center><RNPickerSelect
                                        placeholder={info.placeholder}
                                        Icon={() => {
                                            return <Icon name="chevron-down" size={30} />
                                        }}
                                        style={{
                                            ...styles,
                                        }}
                                        onValueChange={(value) => setFilterGraphMonthly(value)}
                                        items={info.filterGraphMonthly}
                                    /></Center>
                                </Box>
                                {(filterGraphMonthly !== undefined && filterGraphMonthly !== null) &&
                                    (
                                        <Box marginTop={'1%'} marginBottom={'1%'} width={'32%'}>
                                            <Center><RNPickerSelect
                                                placeholder={info.placeholder}
                                                Icon={() => {
                                                    return <Icon name="chevron-down" size={30} />
                                                }}
                                                style={{
                                                    ...styles,
                                                }}
                                                onValueChange={(value) => setFilterGraphWeekly(value)}
                                                items={info.filterGraphWeekly}
                                            /></Center>
                                        </Box>
                                    )
                                }
                            </>
                        }


                        {filterGraph === 2 && <>
                            <Box marginTop={'1%'} marginBottom={'1%'} width={'32%'}>
                                <Center><RNPickerSelect
                                    placeholder={info.placeholder}
                                    Icon={() => {
                                        return <Icon name="chevron-down" size={30} />
                                    }}
                                    style={{
                                        ...styles,
                                    }}
                                    onValueChange={(value) => setFilterGraphMonthly(value)}
                                    items={info.filterGraphMonthly}
                                /></Center>
                            </Box>
                        </>}

                    </HStack>
                    {
                        filterGraph === 2 && filterGraphMonthly === null &&
                        <Text style={{ fontFamily: 'RT', fontSize: 11, color: 'red', marginLeft: '1%' }}>Se muestra el último dato registrado de cada mes</Text>
                    }
                </>
                )
            }


            <FlatList
                style={{ width: "100%" }}
                data={weightsList}
                keyExtractor={(item) => item.id + ""}
                renderItem={renderItem}
            />

            <ModalScreen3 isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} description={'Nueva Presión Sistolica'}>
                <BloodRegister isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} reload={reload} />
            </ModalScreen3>
        </Layout >
    )
};
export default BloodPreasureScreen



const styles = StyleSheet.create({
    modalText: {
        fontFamily: "RBold",
        color: '#FFFFFF'
    },
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#d7d7d7',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        height: 35,
        width: '100%'

    },
    inputAndroid: {
        fontSize: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: '#d7d7d7',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        height: 40,
        width: '100%'
    },
    allTexts: {
        fontFamily: 'RBold',
        fontSize: 15,
    },
});
