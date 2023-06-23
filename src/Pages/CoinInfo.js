import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { Line } from "react-chartjs-2";
import {
  CircularProgress,
  createTheme,
  ThemeProvider,
} from '@mui/material';
// import { chartDays } from "../config/data";
import { CryptoState } from '../ContextCrypto';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import SelectButton from './SelectButton'
import { chartDays } from '../config/data';

const CoinInfo = ({coin}) => {

    const [historicData,setHistoricData] = useState()
  const [days,setDays] = useState(1)
  const [flag,setflag] = useState(false);


const {currency} = CryptoState();
const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    setHistoricData(data.prices);
  };

// console.log("data",historicData);

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);


  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

const Styles={
    container: {
        // width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        // padding: 40,
        // [theme.breakpoints.down("md")]: {
        //   width: "100%",
        //   marginTop: 0,
        //   padding: 20,
        //   paddingTop: 0,
        // }
        },
}
 


    return (
    <ThemeProvider theme={darkTheme}>
        <div style={Styles.container}>

        {
            !historicData?(
              <CircularProgress style={{color:"purple"}}
              thickness={1}
              />
            ):(
              <>
              <Line
              data={{
                labels: historicData.map(coin=>{
                  let date = new Date(coin[0]);

                  let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
                  
                }),

                datasets:[
                  {
                    data:historicData.map((coin)=>coin[1]),
                    label:`Price(Past ${days} Days in ${currency})`,
                    borderColor:"purple"
                  }
                ]

              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
              />


<div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>


              </>
              
            )
        }

        </div>
    </ThemeProvider>
  )
}

export default CoinInfo