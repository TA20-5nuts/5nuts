// let chartDOM = document.getElementById("pie-chart");

const echarts = window.echarts;

let myChart = echarts.init(document.getElementById('pie-chart'));

console.log(myChart)

let option = {
  title: {
    text: 'Food avoided (%)',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  series: [
    {
      type: 'pie',
      radius: ['20%', '70%'],
      // avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      data: [
        {value: 0.9, name: 'Eggs'},
        {value: 4.5, name: 'Cows milk/Dairy'},
        {value: 1.4, name: 'Peanuts'},
        {value: 0.7, name: 'Fish'},
        {value: 2, name: 'Shellfish'},
        {value: 0.2, name: 'Soya'},
        {value: 2.5, name: 'Gluten'},
        {value: 0.4, name: 'Yeast'},
        {value: 0.7, name: 'Treenuts'},
        {value: 8.5, name: 'Other'}
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          // shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

option && myChart.setOption(option);