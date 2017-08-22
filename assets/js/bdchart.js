/**
 * Created by jsbfec on 17/3/19.
 */
$(function(){
    var ctx = $("#circleChart");
    var data = {
        labels: [
            "空中无人机",
            "水下无人机",
            "陆地无人机"
        ],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }]
    };
    var options={
        animation:{
            animateScale:true
            },
        legend: {
            display: false
        },
        title: {
            display: true,
            text: '无人系统行业'
        }
        };
    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: options
    });

    var ctx2 = $("#lineChart");
    //line
    var dataLine = {
        labels: ["0", "2", "4", "6", "8", "10", "12","14","16", "18", "20", "22", "24", "26", "28","30"],
        datasets: [
            {
                label: "需求",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "#f4731c",
                borderColor: "#f4731c",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#f4731c",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#f4731c",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,40,55],
                spanGaps: false
            },
            {
                label: "项目",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "#36A2EB",
                borderColor: "#36A2EB",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#f4731c",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#36A2EB",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [69, 55, 85, 69, 55, 85, 91, 66, 65, 80,91, 66, 69, 55, 85, 69, 55, 85, 91, 66, 65, 80,91, 66, 65, 80,90,65, 80],
                spanGaps: false
            },{
                label: "企业",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "#FFCE56",
                borderColor: "#FFCE56",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#f4731c",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#FFCE56",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [39, 25, 35, 21, 46, 45,40,69, 55, 85, 69, 55, 85, 91, 66, 65, 80,91, 66, 65, 80, 85, 69, 55, 85, 91, 66, 65,43],
                spanGaps: false
            }
        ]
    };
    var optionsLine={
        animation:{
            animateScale:true
        },
        defaultFontColor:"#fff",
        legend: {
            display: true
        }
    };
    var lineChart = new Chart(ctx2, {
        type: 'line',
        data: dataLine,
        options: optionsLine
    });
});
