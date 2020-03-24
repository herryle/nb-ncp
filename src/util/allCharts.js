import echarts from 'echarts'
import '../data/china'
import NBRegion from '../data/NBRegion'

export function drawMap(mockData) {
  echarts.registerMap('ningbo', NBRegion)
  //绘制地图
  const chart = echarts.init(document.getElementById('riskMap'))
  //初始化绘制地图配置
  const options = {
    title: {
      show: false,
      left: 'center',
      padding: 5,
      textStyle: {
        color: '#1d59b6',
        fontSize: 16,
        fontWeight: 'normal',
        fontFamily: 'Microsoft YaHei'
      }
    },
    //图例
    visualMap: {
      show: false,
      min: 0,
      max: 67,
      bottom: 50,
      realtime: false,
      // text: ['高', '低'], // 文本，默认为数值文本
      calculable: true,
      // seriesIndex: [1],
      textStyle: {
        color: '#7B93A7'
      },
      inRange: {
        color: ['#fff7f5', '#ff9f8c', '#ff3b07']
      }
    },
    tooltip: {
      trigger: 'item',
      enterable: true,
      // transitionDuration: 1,
      // formatter: '{b}<br/>确诊{c}例'
      formatter: function(params) {
        // console.log('--------')
        const _text =
          '<div id="seeMore" ><p>' +
          params.data.name +
          ':' +
          params.data.value +
          '例</p>' +
          '<div style="width: 40px;margin: 0 auto;"onclick="seeDeatils(event,\'' +
          params.data.name +
          "'," +
          params.data.value +
          ')">详情></div></div>'
        return _text
      }
    },

    series: {
      type: 'map',
      map: 'ningbo',
      //geoIndex: 0,
      zoom: 1.15, //当前视角的缩放比例。
      aspectScale: 0.95, //长宽比
      showLegendSymbol: false, // 存在legend时显示
      label: {
        normal: {
          show: true,
          textStyle: {
            color: '#000',
            fontSize: 8,
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei'
          }
        }
      },
      // roam: false,
      itemStyle: {
        normal: {
          // areaColor: '#031525',
          // borderColor: '#3B5077',
        },
        emphasis: {
          areaColor: '#f7ff9d'
        }
      },
      animation: false,
      data: mockData
    }
  }
  //渲染地图
  chart.setOption(options, true)
}

//各县市确诊病例 柱状图
export function getChartsBarOne(xObj, yObj, yObj1, ele) {
  // 基于准备好的dom，初始化echarts实例
  const chartbar1 = echarts.init(ele)

  // 指定图表的配置项和数据
  const option = {
    color: ['#f00', '#0f0'],
    legend: {
      data: ['确诊病例', '治愈人数'],
      top: 30,
      right: 0,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: '#fff'
      }
    },
    title: {
      text: '各区县确诊/治愈病例',
      textStyle: {
        color: '#afafbd',
        fontSize: 14
      },
      top: '5'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '6%',
      right: '6%',
      bottom: '0',
      top: '60',
      containLabel: true,
      borderColor: '#28387d'
    },
    xAxis: {
      data: xObj,
      axisLabel: {
        color: '#dddddd',
        rotate: 50,
        fontSize: 9
      },
      axisLine: {
        lineStyle: {
          color: '#28387d'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#28387d'
        }
      }
    },
    yAxis: {
      axisLabel: {
        color: '#dddddd',
        fontSize: 9
      },
      axisLine: {
        lineStyle: {
          color: '#28387d'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#28387d'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#192456'
        }
      },
      minInterval: 1
    },
    series: [
      {
        name: '确诊病例',
        data: yObj,
        type: 'bar',
        label: {
          show: false,
          rotate: 90
        }
      },
      {
        name: '治愈人数',
        data: yObj1,
        type: 'bar',
        label: {
          show: false,
          rotate: 90
        }
      }
    ]
  }

  // 使用刚指定的配置项和数据显示图表。
  chartbar1.setOption(option)
}

// 确诊病例趋势 折线图
export function getChartsLineOne(xObj, yObj, yObj1) {
  // 基于准备好的dom，初始化echarts实例
  const chartline1 = echarts.init(document.getElementById('chart-line-01'))

  const option = {
    color: ['#f00', '#0f0'],
    legend: {
      data: ['确诊病例', '治愈人数'],
      top: 30,
      right: 0,
      textStyle: {
        color: '#fff'
      }
    },
    title: {
      text: '确诊病例/治愈病例趋势',
      textStyle: {
        color: '#afafbd',
        fontSize: 14
      },
      top: '5'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '6%',
      right: '6%',
      bottom: '0',
      top: '60',
      containLabel: true,
      borderColor: '#28387d'
    },
    xAxis: {
      data: xObj,
      axisLabel: {
        color: '#dddddd',
        rotate: 90,
        fontSize: 9
      },
      axisLine: {
        lineStyle: {
          color: '#28387d'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#28387d'
        }
      }
    },
    yAxis: {
      axisLabel: {
        color: '#dddddd',
        fontSize: 9
      },
      axisLine: {
        lineStyle: {
          color: '#28387d'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#28387d'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#192456'
        }
      },
      minInterval: 1
    },
    series: [
      {
        name: '确诊病例',
        data: yObj,
        type: 'line',
        smooth: true
      },
      {
        name: '治愈人数',
        data: yObj1,
        type: 'line',
        smooth: true
      }
    ]
  }

  // 使用刚指定的配置项和数据显示图表。
  chartline1.setOption(option)
}

// 新增病例趋势 折线图
export function getChartsLineTwo(xObj, yObj) {
  // 基于准备好的dom，初始化echarts实例
  const chartline2 = echarts.init(document.getElementById('chart-line-02'))

  const option = {
    title: {
      text: '新增病例趋势',
      textStyle: {
        color: '#afafbd',
        fontSize: 14
      },
      top: '5'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '6%',
      right: '6%',
      bottom: '0',
      top: '40',
      containLabel: true,
      borderColor: '#28387d'
    },
    xAxis: {
      data: xObj,
      axisLabel: {
        color: '#dddddd',
        rotate: 90,
        fontSize: 9
      },
      axisLine: {
        lineStyle: {
          color: '#28387d'
        }
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: '#28387d'
        }
      }
    },
    yAxis: {
      axisLabel: {
        color: '#dddddd',
        fontSize: 9
      },
      axisLine: {
        lineStyle: {
          color: '#28387d'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#28387d'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#192456'
        }
      },
      minInterval: 1
    },
    series: [
      {
        data: yObj,
        type: 'line',
        smooth: true
      }
    ]
  }

  // 使用刚指定的配置项和数据显示图表。
  chartline2.setOption(option)
}

// 密切接触者趋势 折线图
export function getChartsLineThree(xObj, yObj, el) {
  // 基于准备好的dom，初始化echarts实例
  const chartline3 = echarts.init(el)
  // constchartline3 = echarts.init(document.getElementById('chart-line-03'));

  const option = {
    color: ['#f9b739'],
    title: {
      text: '密切接触者趋势',
      textStyle: {
        color: '#afafbd',
        fontSize: 14
      },
      top: '5'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '6%',
      right: '6%',
      bottom: '0',
      top: '40',
      containLabel: true,
      borderColor: '#28387d'
    },
    xAxis: {
      data: xObj,
      axisLabel: {
        color: '#dddddd',
        rotate: 90,
        fontSize: 9
      },
      axisLine: {
        lineStyle: {
          color: '#28387d'
        }
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: '#28387d'
        }
      }
    },
    yAxis: {
      axisLabel: {
        color: '#dddddd',
        fontSize: 9
      },
      axisLine: {
        lineStyle: {
          color: '#28387d'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#28387d'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#192456'
        }
      },
      minInterval: 1
    },
    series: [
      {
        data: yObj,
        type: 'line',
        smooth: true
        // label: {
        //     normal: {
        //         show: true,
        //         fontSize: 9,
        //         position: 'top'
        //     }
        // }
      }
    ]
  }
  // 使用刚指定的配置项和数据显示图表。
  chartline3.setOption(option)
}

// 确诊病例年龄分布  柱状图
export function getChartsBarTwo(xObj, yObj) {
  // 基于准备好的dom，初始化echarts实例
  const chartbar2 = echarts.init(document.getElementById('chart-bar-02'))

  // 指定图表的配置项和数据
  const option = {
    title: {
      text: '确诊病例年龄分布',
      textStyle: {
        color: '#afafbd',
        fontSize: 14
      },
      top: '5'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '6%',
      right: '6%',
      bottom: '0',
      top: '40',
      containLabel: true,
      borderColor: '#28387d'
    },
    xAxis: {
      data: xObj,
      axisLabel: {
        color: '#dddddd',
        rotate: 50,
        fontSize: 9
      },
      axisLine: {
        lineStyle: {
          color: '#28387d'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#28387d'
        }
      }
    },
    yAxis: {
      axisLabel: {
        color: '#dddddd',
        fontSize: 9
      },
      axisLine: {
        lineStyle: {
          color: '#28387d'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#28387d'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#192456'
        }
      },
      minInterval: 1
    },
    series: [
      {
        data: yObj,
        type: 'bar'
      }
    ]
  }

  // 使用刚指定的配置项和数据显示图表。
  chartbar2.setOption(option)
}

// 累计出院人数 折线图
export function getChartsLineFour(xObj, yObj, el) {
  // 基于准备好的dom，初始化echarts实例
  const chartline4 = echarts.init(el)

  const option = {
    color: ['#22a9ff'],
    title: {
      text: '累计出院人数',
      textStyle: {
        color: '#afafbd',
        fontSize: 14
      },
      top: '5'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '6%',
      right: '6%',
      bottom: '0',
      top: '40',
      containLabel: true,
      borderColor: '#28387d'
    },
    xAxis: {
      data: xObj,
      axisLabel: {
        color: '#dddddd',
        rotate: 90,
        fontSize: 9
      },
      axisLine: {
        lineStyle: {
          color: '#28387d'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#28387d'
        }
      }
    },
    yAxis: {
      axisLabel: {
        color: '#dddddd',
        fontSize: 9
      },
      axisLine: {
        lineStyle: {
          color: '#28387d'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#28387d'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#192456'
        }
      },
      minInterval: 1
    },
    series: [
      {
        data: yObj,
        type: 'line',
        smooth: true,
        label: {
          normal: {
            show: true,
            fontSize: 9,
            position: 'top'
          }
        }
      }
    ]
  }

  // 使用刚指定的配置项和数据显示图表。
  chartline4.setOption(option)
}

// 人口迁入规模指数 折现图
export function getChartsLineMigrate(xObj, yObj, yObj1) {
  // 基于准备好的dom，初始化echarts实例
  const chartline5 = echarts.init(document.getElementById('migrateChart'))

  const option = {
    color: ['#00b0f0', '#006d58'],
    legend: {
      data: ['今年迁徙指数', '去年迁徙指数'],
      top: 30,
      right: 0,
      textStyle: {
        color: '#fff'
      }
    },
    title: {
      text: '迁徙规模指数',
      textStyle: {
        color: '#afafbd',
        fontSize: 14
      },
      top: '5'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '6%',
      right: '6%',
      bottom: '0',
      top: '60',
      containLabel: true,
      borderColor: '#28387d'
    },
    xAxis: {
      data: xObj,
      axisLabel: {
        color: '#dddddd',
        rotate: 90,
        fontSize: 9
      },
      axisLine: {
        lineStyle: {
          color: '#28387d'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#28387d'
        }
      }
    },
    yAxis: {
      axisLabel: {
        color: '#dddddd',
        fontSize: 9
      },
      axisLine: {
        lineStyle: {
          color: '#28387d'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#28387d'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#192456'
        }
      },
      minInterval: 1
    },
    series: [
      {
        name: '今年迁徙指数',
        data: yObj,
        type: 'line',
        smooth: true
      },
      {
        name: '去年迁徙指数',
        data: yObj1,
        type: 'line',
        smooth: true
      }
    ]
  }

  // 使用刚指定的配置项和数据显示图表。
  chartline5.setOption(option)
}

// 柱状图
export function getPatientBarOne(xObj, yObj, ele) {
  // 基于准备好的dom，初始化echarts实例
  const chartbar1 = echarts.init(ele)

  // 指定图表的配置项和数据
  const option = {
    // color: ['#f00','#22a9ff'],
    title: {
      text: '500米内人口',
      textStyle: {
        color: '#afafbd',
        fontSize: 14
      },
      top: '5'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '6%',
      right: '6%',
      bottom: '0',
      top: '40',
      containLabel: true,
      borderColor: '#28387d'
    },
    xAxis: {
      data: xObj,
      axisLabel: {
        color: '#dddddd',
        rotate: 50,
        fontSize: 9
      },
      axisLine: {
        lineStyle: {
          color: '#28387d'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#28387d'
        }
      }
    },
    yAxis: {
      axisLabel: {
        color: '#dddddd',
        fontSize: 9
      },
      axisLine: {
        lineStyle: {
          color: '#28387d'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#28387d'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#192456'
        }
      },
      minInterval: 1
    },
    series: [
      {
        data: yObj,
        type: 'bar',
        label: {
          show: false,
          rotate: 90
        }
      }
    ]
  }

  // 使用刚指定的配置项和数据显示图表。
  chartbar1.setOption(option)
}

// 柱状图
export function getPatientBarTwo(xObj, yObj) {
  // 基于准备好的dom，初始化echarts实例
  const chartbar2 = echarts.init(document.getElementById('patient-bar-02'))

  // 指定图表的配置项和数据
  const option = {
    // color: ['#f00','#22a9ff'],
    title: {
      text: '1公里内人口',
      textStyle: {
        color: '#afafbd',
        fontSize: 14
      },
      top: '5'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '6%',
      right: '6%',
      bottom: '0',
      top: '40',
      containLabel: true,
      borderColor: '#28387d'
    },
    xAxis: {
      data: xObj,
      axisLabel: {
        color: '#dddddd',
        rotate: 50,
        fontSize: 9
      },
      axisLine: {
        lineStyle: {
          color: '#28387d'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#28387d'
        }
      }
    },
    yAxis: {
      axisLabel: {
        color: '#dddddd',
        fontSize: 9
      },
      axisLine: {
        lineStyle: {
          color: '#28387d'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#28387d'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#192456'
        }
      },
      minInterval: 1
    },
    series: [
      {
        data: yObj,
        type: 'bar',
        label: {
          show: false,
          rotate: 90
        }
      }
    ]
  }

  // 使用刚指定的配置项和数据显示图表。
  chartbar2.setOption(option)
}
// 柱状图
export function getPatientBarThree(xObj, yObj, ele) {
  // 基于准备好的dom，初始化echarts实例
  const chartbar3 = echarts.init(ele)

  // 指定图表的配置项和数据
  const option = {
    // color: ['#f00','#22a9ff'],
    title: {
      text: '2公里内人口',
      textStyle: {
        color: '#afafbd',
        fontSize: 14
      },
      top: '5'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '6%',
      right: '6%',
      bottom: '0',
      top: '40',
      containLabel: true,
      borderColor: '#28387d'
    },
    xAxis: {
      data: xObj,
      axisLabel: {
        color: '#dddddd',
        rotate: 50,
        fontSize: 9
      },
      axisLine: {
        lineStyle: {
          color: '#28387d'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#28387d'
        }
      }
    },
    yAxis: {
      axisLabel: {
        color: '#dddddd',
        fontSize: 9
      },
      axisLine: {
        lineStyle: {
          color: '#28387d'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#28387d'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#192456'
        }
      },
      minInterval: 1
    },
    series: [
      {
        data: yObj,
        type: 'bar',
        label: {
          show: false,
          rotate: 90
        }
      }
    ]
  }

  // 使用刚指定的配置项和数据显示图表。
  chartbar3.setOption(option)
}

export const chinaGeoCoordMap = {
  北京: [116.417152307, 40.185361941],
  重庆: [107.859861192, 30.046253491],
  澳门: [113.564658099, 22.156059941],
  天津: [117.33187511, 39.301679982],
  香港: [114.138835022, 22.378541658],
  安徽: [117.239260658, 31.812377008],
  福建: [117.987300752, 26.065627351],
  贵州: [106.857423996, 26.805570653],
  河北: [115.553683741, 39.018222256],
  黑龙江: [127.832230301, 47.897825427],
  河南: [113.614694993, 33.874713147],
  湖北: [112.268979599, 30.979862895],
  湖南: [111.711848303, 27.600057875],
  江苏: [119.487652134, 32.958464788],
  江西: [115.713716637, 27.598154285],
  辽宁: [122.607212644, 41.292841712],
  陕西: [108.844908532, 35.140530785],
  山东: [118.147188625, 36.356141184],
  山西: [112.275487415, 37.54297266],
  四川: [102.648840861, 30.616427993],
  浙江: [120.096874496, 29.174405952],
  海南: [109.836351138, 19.272275977],
  广东: [113.39679095, 23.325507221],
  甘肃: [102.221455727, 38.319497532],
  广西: [108.77140888, 23.824461866],
  吉林: [126.254809222, 43.663228855],
  宁夏: [106.163970861, 37.258094524],
  青海: [95.905380252, 35.671008124],
  云南: [101.457717632, 24.962374465],
  新疆: [85.14482234, 40.977648519],
  西藏: [88.124309027, 31.642594417],
  内蒙古: [112.856387067, 43.909622031],
  台湾: [120.96458799, 23.745756933],
  上海: [121.460827755, 31.196143111],
  宁波: [121.55, 29.87]
}

//人口迁徙
export function renderMoveMap(chinaDatas) {
  const mapBoxEchart = echarts.init(document.getElementById('moveMap'))
  const convertData = function(data) {
    const res = []
    for (let i = 0; i < data.length; i++) {
      const dataItem = data[i]
      if (dataItem[0].value) {
        const fromCoord = chinaGeoCoordMap[dataItem[0].name]
        const toCoord = chinaGeoCoordMap['宁波']
        if (fromCoord && toCoord) {
          res.push([
            {
              coord: fromCoord,
              value: dataItem[0].value
            },
            {
              coord: toCoord
            }
          ])
        }
      }
    }
    return res
  }
  const series = []
  ;[['宁波', chinaDatas]].forEach(function(item) {
    // console.log(item)
    series.push(
      {
        type: 'lines',
        zlevel: 2,
        effect: {
          show: true,
          period: 4, //箭头指向速度，值越小速度越快
          trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
          symbol: 'arrow', //箭头图标
          symbolSize: 5 //图标大小
        },
        lineStyle: {
          normal: {
            width: 1, //尾迹线条宽度
            opacity: 1, //尾迹线条透明度
            curveness: 0.3 //尾迹线条曲直度
          }
        },
        data: convertData(item[1])
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
          //涟漪特效
          period: 4, //动画时间，值越小速度越快
          brushType: 'stroke', //波纹绘制方式 stroke, fill
          scale: 4 //波纹圆环最大限制，值越大波纹越大
        },
        label: {
          normal: {
            show: true,
            position: 'bottom', //显示位置
            offset: [0, 0], //偏移设置
            formatter: function(params) {
              //圆环显示文字
              return params.data.name
            },
            fontSize: 10
          },
          emphasis: {
            show: true
          }
        },
        symbol: 'circle',
        symbolSize: function(val) {
          return val[2] == 0 ? 0.1 : val[2] / 3
          // 5 + val[2] * 5; //圆环大小
        },
        itemStyle: {
          normal: {
            show: false,
            color: '#f00'
          }
        },
        data: item[1].map(function(dataItem) {
          return {
            name: dataItem[0].name,
            value: chinaGeoCoordMap[dataItem[0].name].concat([
              dataItem[0].value
            ])
          }
        })
      },
      //被攻击点
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
          period: 4,
          brushType: 'stroke',
          scale: 4
        },
        label: {
          normal: {
            show: true,
            position: 'right',
            //offset:[5, 0],
            color: '#0cbdff',
            formatter: '{b}',
            textStyle: {
              color: '#0cbdff'
            }
          },
          emphasis: {
            show: true,
            color: '#f60'
          }
        },
        symbol: 'pin',
        symbolSize: 20,
        data: [
          {
            name: item[0],
            value: chinaGeoCoordMap[item[0]].concat([59])
          }
        ]
      }
    )
  })

  const option = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(166, 200, 76, 0.82)',
      borderColor: '#FFFFCC',
      showDelay: 0,
      hideDelay: 0,
      enterable: true,
      transitionDuration: 0,
      extraCssText: 'z-index:100',
      formatter: function(params) {
        //根据业务自己拓展要显示的内容
        var res = ''
        const name = params.name
        const value = params.value[params.seriesIndex + 1]
        if (params.name != '' && value) {
          res =
            "<span style='color:#fff;'>" +
            name +
            '</span><br/>数据：' +
            value +
            '%'
          return res
        }
      }
    },
    backgroundColor: '#15005b',
    visualMap: {
      //图例值控制
      min: -0.0001,
      max: 60,
      calculable: true,
      show: false,
      //'#0cbdff', '#18c0fe', '#7bd6f8', '#cbe8f2', '#F0F0F0' 最大值到最小值
      color: [
        '#0cbdff',
        '#0cbdff',
        '#0cbdff',
        '#0cbdff',
        '#0cbdff',
        '#0cbdff',
        '#0cbdff',
        '#0cbdff',
        '#0cbdff',
        '#0cbdff',
        '#0cbdff',
        '#0cbdff',
        '#18c0fe',
        '#18c0fe',
        '#18c0fe',
        '#18c0fe',
        '#18c0fe',
        '#7bd6f8',
        '#cbe8f2',
        '#F0F0F0'
      ],
      textStyle: {
        color: '#fff'
      }
    },
    geo: {
      map: 'china',
      zoom: 1.2,
      aspectScale: 0.63,
      label: {
        emphasis: {
          show: false
        }
      },
      roam: false, //是否允许缩放
      itemStyle: {
        normal: {
          color: 'rgba(51, 69, 89, .5)', //地图背景色
          borderColor: '#516a89', //省市边界线00fcff 516a89
          borderWidth: 1
        },
        emphasis: {
          color: 'rgba(37, 43, 61, .5)' //悬浮背景
        }
      }
    },
    series: series
  }
  mapBoxEchart.setOption(option)
}

//五色图
export function renderMap2(data) {
  const chart = echarts.init(document.getElementById('riskMap'))
  //初始化绘制地图配置
  var options = {
    title: {
      show: false,
      left: 'center',
      padding: 5,
      textStyle: {
        color: '#1d59b6',
        fontSize: 16,
        fontWeight: 'normal',
        fontFamily: 'Microsoft YaHei'
      }
    },
    //图例
    visualMap: {
      show: false,
      min: 1,
      max: 5,
      bottom: 50,
      realtime: false,
      calculable: true,
      textStyle: {
        color: '#7B93A7'
      },
      inRange: {
        color: ['#91ff8f', '#51c5ff', '#ffff00', '#ff7f00', '#fe0000']
      }
    },
    tooltip: {
      trigger: 'item',
      enterable: true,
      formatter: function(params) {
        var _text =
          '<div id="seeMore" ><p>' +
          params.data.name +
          ':' +
          params.data.num +
          '例</p>' +
          '<div style="width: 40px;margin: 0 auto;"onclick="seeDeatils(event,\'' +
          params.data.name +
          "'," +
          params.data.value +
          ')">详情></div></div>'
        return _text
      }
    },
    series: {
      type: 'map',
      map: 'ningbo',
      zoom: 1.15, //当前视角的缩放比例。
      aspectScale: 0.95, //长宽比
      showLegendSymbol: false, // 存在legend时显示
      label: {
        normal: {
          show: true,
          textStyle: {
            color: '#000',
            fontSize: 8,
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei'
          }
        }
      },
      itemStyle: {
        normal: {},
        emphasis: {
          areaColor: '#f7ff9d'
        }
      },
      animation: false,
      data: data
    }
  }
  //渲染地图
  chart.setOption(options, true)
}
//复工率
export function renderMap3(data) {
  const chart = echarts.init(document.getElementById('riskMap'))
  //初始化绘制地图配置
  var options = {
    title: {
      show: false,
      left: 'center',
      padding: 5,
      textStyle: {
        color: '#1d59b6',
        fontSize: 16,
        fontWeight: 'normal',
        fontFamily: 'Microsoft YaHei'
      }
    },
    //图例
    visualMap: {
      show: false,
      min: 1,
      max: 5,
      bottom: 50,
      realtime: false,
      calculable: true,
      textStyle: {
        color: '#7B93A7'
      },
      inRange: {
        color: ['#6cfd70', '#8cc2fe', '#fbfc22', '#fe8301', '#fe0000']
      }
    },
    tooltip: {
      show: false
      // trigger: 'item',
      // enterable: true,
      // formatter: function(params) {
      //     var _text = '<div id="seeMore" ><p>' + params.data.name + ':' + params.data.num + '例</p>' +
      //         '<div style="width: 40px;margin: 0 auto;"onclick="seeDeatils(event,\'' +
      //         params.data.name + '\',' + params.data.value + ')">详情></div></div>'
      //     return _text
      // }
    },
    series: {
      type: 'map',
      map: 'ningbo',
      zoom: 1.15, //当前视角的缩放比例。
      aspectScale: 0.95, //长宽比
      showLegendSymbol: false, // 存在legend时显示
      label: {
        normal: {
          show: true,
          textStyle: {
            color: '#000',
            fontSize: 8,
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei'
          }
        }
      },
      itemStyle: {
        normal: {},
        emphasis: {
          areaColor: '#f7ff9d'
        }
      },
      animation: false,
      data: data
    }
  }
  //渲染地图
  chart.setOption(options, true)
}

// 人口迁入规模指数 折现图
// export function getChartsLineMigrate(xObj, yObj, yObj1) {
//   // 基于准备好的dom，初始化echarts实例
//   constchartline5 = echarts.init(document.getElementById('migrateChart'))

//   const option = {
//     color: ['#00b0f0', '#006d58'],
//     legend: {
//       data: ['今年迁徙指数', '去年迁徙指数'],
//       top: 30,
//       right: 0,
//       textStyle: {
//         color: '#fff'
//       }
//     },
//     title: {
//       text: '迁徙规模指数',
//       textStyle: {
//         color: '#afafbd',
//         fontSize: 14
//       },
//       top: '5'
//     },
//     tooltip: {
//       trigger: 'axis',
//       axisPointer: {
//         type: 'shadow'
//       }
//     },
//     grid: {
//       left: '6%',
//       right: '6%',
//       bottom: '0',
//       top: '60',
//       containLabel: true,
//       borderColor: '#28387d'
//     },
//     xAxis: {
//       data: xObj,
//       axisLabel: {
//         color: '#dddddd',
//         rotate: 90,
//         fontSize: 9
//       },
//       axisLine: {
//         lineStyle: {
//           color: '#28387d'
//         }
//       },
//       axisTick: {
//         lineStyle: {
//           color: '#28387d'
//         }
//       }
//     },
//     yAxis: {
//       axisLabel: {
//         color: '#dddddd',
//         fontSize: 9
//       },
//       axisLine: {
//         lineStyle: {
//           color: '#28387d'
//         }
//       },
//       axisTick: {
//         lineStyle: {
//           color: '#28387d'
//         }
//       },
//       splitLine: {
//         lineStyle: {
//           color: '#192456'
//         }
//       },
//       minInterval: 1
//     },
//     series: [
//       {
//         name: '今年迁徙指数',
//         data: yObj,
//         type: 'line',
//         smooth: true
//       },
//       {
//         name: '去年迁徙指数',
//         data: yObj1,
//         type: 'line',
//         smooth: true
//       }
//     ]
//   }

//   // 使用刚指定的配置项和数据显示图表。
//   chartline5.setOption(option)
// }
