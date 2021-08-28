// let chartDOM = document.getElementById("pie-chart");

const echarts = window.echarts;

function drawPieChart() {
  let pieChart = echarts.init(document.getElementById('pie-chart'));

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
      left: "10%"
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

  option && pieChart.setOption(option);
}

function drawBarChart() {
  let barChart = echarts.init(document.getElementById("bar-chart"));
  let option;

  option = {
    title: {
      text: "Type of food avoided for cultural, religious or ethical reasons (age groups)",
      left: "center"
    },
    legend: {
      top: 30
    },
    tooltip: {},
    dataset: {
      source: [
        ['product', '2-18', '19-30'],
        ['Meat', 0.9, 2.8],
        ['Fish', 0.4, 2.3],
        ['Poultry', 0.6, 2.5],
        ['Pork', 4.4, 5.1],
        ['Haram', 0.6, 0.7],
        ['Beef', 0.8, 3.5],
        ['Eggs', 0.3, 1.2],
        ['All animation products', 0.1, 0.5],
        ['Other', 0.4, 1.2]
      ]
    },
    xAxis: {
      type: 'category',
      show: true,
      axisLabel: {
        interval: 0,
        rotate: 30
      }
    },
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
      {
        type: 'bar'
      },
      {
        type: 'bar'
      }
    ]
  };

  option && barChart.setOption(option);
}

drawPieChart();
drawBarChart();
