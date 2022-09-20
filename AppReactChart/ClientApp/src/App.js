import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,

    ArcElement
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        }
    },
};

const inicioBar = {
    labels: [""],
    datasets: [
        {
            label: 'Total Ventas',
            data: [0],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    ],
};
const inicioDonut = {
    labels: [""],
    datasets: [
        {
            label: 'Total',
            data: [0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const App = () => {

    const [dataBar, setDataBar] = useState(inicioBar)
    const [dataDonut, setDataDonut] = useState(inicioDonut)


    useEffect(() => {

        fetch("api/reporte/ResumenSemana")
            .then(response => { return response.json() })
            .then(responseJson => {

                console.log(responseJson)

                const labelsBar = responseJson.ventasSemana.map(item => (item.fecha))
                const valuesBar = responseJson.ventasSemana.map(item => (item.total))

                const contenidoBar = {
                    labels: labelsBar,
                    datasets: [
                        {
                            label: 'Total Ventas',
                            data: valuesBar,
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        }
                    ],
                };

                setDataBar(contenidoBar)

                //--------------------------------------------------------------
                const labelsDonut = responseJson.productosSemana.map(item => (item.producto))
                const valuesDonut = responseJson.productosSemana.map(item => (item.total))


                const contenidoDonut = {
                    labels: labelsDonut,
                    datasets: [
                        {
                            label: 'Total',
                            data: valuesDonut,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                };

                setDataDonut(contenidoDonut)

            })

    }, [])




    return (

        <div className="container mt-2">
            <div className="row">
                <div className="col-sm-6">
                    <h1>Total ventas de la semana</h1>
                    <div style={{ height: 350 }}>
                        <Bar options={options} data={dataBar} />
                    </div>
                </div>

                <div className="col-sm-6">
                    <h1>Productos mayor vendido</h1>
                    <div style={{ height: 350 }}>
                        <Doughnut data={dataDonut} options={options} />
                    </div>
                </div>
            </div>




        </div>
    )
}

export default App;