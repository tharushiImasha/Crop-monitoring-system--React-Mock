import {useEffect, useState} from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
    Pie,
    PieChart
} from 'recharts';

export function Dashboard() {

    type ChartData = {
        name: string;
        value: number;
    };

    const data: ChartData[] = [
        { name: 'Rice', value: 400 },
        { name: 'Green Gram', value: 300 },
        { name: 'Cow Pea', value: 200 },
        { name: 'Cassava', value: 278 },
        { name: 'Chick Pea', value: 189 },
    ];

    const apiKey: string = "c020e98536e93899394afe2946800208";
    const city: string = "Galle";

    interface WeatherData {
        weather: { description: string; icon: string }[];
        main: { temp: number };
    }

    const [weatherStatus, setWeatherStatus] = useState<string>("");
    const [temperature, setTemperature] = useState<string>("");
    const [weatherIcon, setWeatherIcon] = useState<string>("");
    const [time, setTime] = useState<string>(new Date().toLocaleTimeString());

    useEffect(() => {
        async function fetchWeather(): Promise<void> {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
                );
                if (!response.ok) throw new Error(`Error fetching weather data: ${response.statusText}`);

                const data: WeatherData = await response.json();
                setWeatherStatus(
                    data.weather[0].description.charAt(0).toUpperCase() +
                    data.weather[0].description.slice(1)
                );
                setTemperature(`${data.main.temp} °C`);
                setWeatherIcon(`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        }

        fetchWeather();

        // Update time every second
        const timeInterval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(timeInterval); // Cleanup on unmount
    }, []);

    const [activeIndex, setActiveIndex] = useState(-1);

    const pieData = [
        { name: 'Chick Pea', amount: 400 },
        { name: 'Cassava', amount: 700 },
        { name: 'Green Gram', amount: 200 },
        { name: 'Rice', amount: 1000 }
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    return (
        <>
            <main className="flex flex-col bg-gray-100 min-h-screen pt-[60px]">
                <div className="px-10 py-5">
                    <div className="mb-8">
                        <h5 className="text-gray-500 text-lg">Hello,</h5>
                        <h2 className="text-[32px] font-bold">{localStorage.getItem("name")}</h2>
                    </div>
                    <section className="grid grid-cols-2 gap-6">
                        <div className="bg-white p-4 rounded-lg shadow-md h-[400px]">
                            <h3 className="text-lg font-semibold text-center mt-[20px]">Field Extent Sizes</h3>
                            <ResponsiveContainer width="100%" height={320}>
                                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="value" fill="#026664af" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center ">
                            <h3 className="text-lg font-semibold text-center mt-[20px] mb-[30px]">Most Cultivated Plants</h3>
                            <PieChart width={250} height={250}>
                                <Pie
                                    activeIndex={activeIndex}
                                    data={pieData}
                                    dataKey="amount"
                                    outerRadius={120}
                                    fill="green"
                                    onMouseEnter={onPieEnter}
                                    style={{ cursor: 'pointer', outline: 'none' }} // Ensure no outline on focus
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>

                        </div>

                        {/* Weather Widget */}
                        <div className="bg-white p-4 rounded-lg shadow-md h-[250px] text-center flex flex-col justify-center">
                            <div className="bg-[url('/public/assets/weather.jpeg')] rounded-lg p-[15px]">
                                <h3 className="text-[20px] font-semibold mt-[10px]">Weather</h3>
                                <div className="flex items-center justify-center gap-2">
                                    <img
                                        src={weatherIcon}
                                        alt="Weather Icon"
                                        className="w-[150px] h-auto"
                                    />
                                    <h2 className="text-xl font-bold">{weatherStatus || "Loading..."}</h2>
                                </div>
                            </div>

                        </div>

                        {/* Temperature and Time Widget */}
                        <div
                            className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center gap-2">
                            <div className="bg-[#F1F7F7] w-full flex justify-center gap-8 items-center py-[10px]">
                                <img src="/assets/temp.png" alt="Temp Icon" className="w-14 h-14"/>
                                <div className="flex flex-col items-center ">
                                    <h3 className="text-lg font-semibold mb-[20px] text-center">Temperature</h3>
                                    <h2 className="text-xl font-bold">{temperature || "Loading..."}</h2>
                                </div>
                            </div>

                            <div className="bg-[#F1F7F7] w-full flex gap-8 justify-center items-center py-[10px]">
                                <img src="/assets/time.png" alt="Time Icon" className="w-14 h-14"/>
                                <div className="flex flex-col items-center">
                                    <h3 className="text-lg font-semibold mb-[20px] text-center">Time</h3>
                                    <h2 className="text-xl font-bold">{time}</h2>
                                </div>
                            </div>

                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}