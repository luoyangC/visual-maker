export * from './chart.type'
export { Chart } from './chart'
import { BarChart } from './chart-bar'
import { PieChart } from './chart-pie'
import { LineChart } from './chart-line'
import { CustomChart } from './chart-custom'

export const charts = {
  BarChart,
  PieChart,
  LineChart,
  CustomChart
}
