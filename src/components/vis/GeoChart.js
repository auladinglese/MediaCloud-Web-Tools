import React from 'react';
import ReactHighmaps from 'react-highcharts/dist/ReactHighmaps';
import { FormattedMessage, injectIntl } from 'react-intl';
import initHighcharts from './initHighcharts';
import { getBrandDarkColor } from '../../styles/colors';

initHighcharts();

const maps = require('./world-eckert3-lowres');

const localMessages = {
  title: { id: 'chart.geographyAttention.chart.title', defaultMessage: 'Mentions by Country' },
  seriesName: { id: 'chart.geographyAttention.series.name', defaultMessage: 'Geographic Attention' },
  tooltipTitle: { id: 'chart.geographyAttention.title', defaultMessage: '{count} of sentences mention {name}' },
  noData: { id: 'chart.geographyAttention.noData', defaultMessage: 'Sorry, but we don\'t have any data about the places mentioned.' },
};

class GeoChart extends React.Component {

  getConfig() {
    const { data, countryMinColorScale, countryMaxColorScale, hoverColor } = this.props;
    const { formatMessage, formatNumber } = this.props.intl;
    const options = {
      countryMinColorScale,
      countryMaxColorScale,
      hoverColor,
    };
    if (countryMinColorScale === undefined) {
      options.countryMinColorScale = '#ffffff';
    }
    if (countryMaxColorScale === undefined) {
      options.countryMinColorScale = getBrandDarkColor();
    }
    if (hoverColor === undefined) {
      options.hoverColor = '#BADA55';
    }
    const config = {
      // Initiate the chart
      title: {
        text: '',
      },
      mapNavigation: {
        enabled: false,
      },
      exporting: {
        enabled: true,
      },
      navigation: {
        buttonOptions: {
          align: 'right',
        },
      },
      colorAxis: {
        min: 0.000001,
        minColor: options.countryMinColorScale,
        max: 1.0,
        maxColor: options.countryMaxColorScale,
        type: 'logarithmic',
      },
      tooltip: {
        pointFormatter: function afmtxn() {
          // important to name this, rather than use arrow function, so `this` is preserved to be what highcharts gives us
          const rounded = formatNumber(this.count, { style: 'percent', maximumFractionDigits: 2 });
          const pct = formatMessage(localMessages.tooltipTitle, { count: rounded, name: this.name });
          return pct;
        },
      },
      series: [{
        data,
        mapData: maps,
        joinBy: 'iso-a2',
        name: formatMessage(localMessages.seriesName),
        allowPointSelect: true,
        cursor: 'pointer',
        states: {
          hover: {
            color: options.hoverColor,
          },
          select: {
            color: '#a4edba',
            borderColor: 'black',
            dashStyle: 'shortdot',
          },
        },
        dataLabels: {
          enabled: false,
          format: '{point.name} {point.count} ',
        },
      }],
      legend: {
        layout: 'vertical',
        valueDecimals: 0,
        backgroundColor: 'rgba(255,255,255,0.9)',
        itemStyle: {
          fontWeight: 'bold',
          fontStyle: 'italic',
          color: 'gray',
          textDecoration: 'none',
        },
        maxHeight: 150,
        symbolHeight: 70,
        align: 'left',
        verticalAlign: 'bottom',
        floating: true,
      },
    };
    return config;
  }

  render() {
    const { onCountryClick, data } = this.props;
    // if there is no data then show info about our geocoding
    let content = null;
    if (data.length === 0) {
      content = <p><FormattedMessage {...localMessages.noData} /></p>;
    } else {
      const config = this.getConfig();
      config.exporting = true;
      if (onCountryClick) {
        config.plotOptions = {
          series: {
            cursor: 'pointer',
            point: {
              events: {
                click: function handleCountryClick(event) {
                  onCountryClick(event, this);  // preserve the highcharts "this", which is the chart
                },
              },
            },
          },
        };
      }
      content = React.createElement(ReactHighmaps, { config });
    }
    return content;
  }
}


GeoChart.propTypes = {
  data: React.PropTypes.array.isRequired,
  countryMinColorScale: React.PropTypes.string,
  countryMaxColorScale: React.PropTypes.string,
  hoverColor: React.PropTypes.string,
  onCountryClick: React.PropTypes.func,
  intl: React.PropTypes.object.isRequired,
};

export default injectIntl(GeoChart);
