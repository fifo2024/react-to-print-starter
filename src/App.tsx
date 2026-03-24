import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import * as echarts from "echarts";
import "./App.css";

function App() {
  const pieChartRef = useRef<HTMLDivElement>(null);
  const barChartRef = useRef<HTMLDivElement>(null);

  // 饼图数据
  const pieData = [
    { value: 1048, name: "Search Engine" },
    { value: 735, name: "Direct" },
    { value: 580, name: "Email" },
    { value: 484, name: "Union Ads" },
    { value: 300, name: "Video Ads" },
  ];

  // 柱状图数据
  const barData = {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [120, 200, 150, 80, 70, 110, 130],
  };

  const contentRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: '打印文档',
    onAfterPrint: () => console.log('打印完成'),
  })

  useEffect(() => {
    // 初始化饼图
    if (pieChartRef.current) {
      const pieChart = echarts.init(pieChartRef.current);
      pieChart.setOption({
        title: { text: "Traffic Sources" },
        tooltip: { trigger: "item" },
        legend: { orient: "vertical", left: "left" },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    }

    // 初始化柱状图
    if (barChartRef.current) {
      const barChart = echarts.init(barChartRef.current);
      barChart.setOption({
        title: { text: "Weekly Sales" },
        tooltip: {},
        xAxis: { data: barData.categories },
        yAxis: {},
        series: [
          {
            name: "Sales",
            type: "bar",
            data: barData.values,
          },
        ],
      });
    }

    // 窗口大小变化时重新调整图表大小
    const handleResize = () => {
      pieChartRef.current &&
        echarts.getInstanceByDom(pieChartRef.current)?.resize();
      barChartRef.current &&
        echarts.getInstanceByDom(barChartRef.current)?.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="App">
      <button onClick={handlePrint}>Print</button>
      <div ref={contentRef} style={{display: 'flex', flexDirection: 'column', alignItems: 'center',
        background: '#abc123',
      }}>
        <div>title</div>
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <div
            ref={pieChartRef}
            style={{ width: "400px", height: "400px" }}
          ></div>
          <div
            ref={barChartRef}
            style={{ width: "400px", height: "400px" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
