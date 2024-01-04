import {useState, useContext, useEffect} from 'react';
import {DiaryStateContext} from "../App";
import Header from "../component/Header";
import Button from "../component/Button";
import {getMonthRangeByDate} from "../util";
import DiaryList from "../component/DiaryList";
const Home = () => {
    const [pivotDate, setPivotDate] = useState(new Date());
    const [filteredData, setFilteredData] = useState([]);
    const HeaderTitle = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`
    const data = useContext(DiaryStateContext);

    useEffect(() => {
        if (data.length >= 1) {
            const {beginTimeStamp, endTimeStamp} = getMonthRangeByDate(pivotDate);
            setFilteredData(
                data.filter((it) => beginTimeStamp <= it.date && it.date <= endTimeStamp)
            );
        } else {
            setFilteredData([]);
        }
    }, [data, pivotDate])

    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    }

    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    }

    return (
        <div>
            <Header
                title={HeaderTitle}
                leftChild={<Button text={"<"} onClick={onDecreaseMonth}/> }
                rightChild={<Button text={">"} onClick={onIncreaseMonth}/>
            }/>
            <DiaryList data={filteredData}/>
        </div>);
}

export default Home;