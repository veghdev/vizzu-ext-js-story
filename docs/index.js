import VizzuPlayer from 'https://cdn.jsdelivr.net/npm/vizzu-story@~0.1.0/dist/vizzu-story.min.js';
import data from './data.js';
import style from './style.js';

function labelHandler(event) {
  let Year = parseFloat(event.data.text);
  if (!isNaN(Year) && Year > 1950 && Year < 2020 && Year % 5 !== 0) {
    event.preventDefault();
  }
}

let vizzuPlayerData = {
  data: data, // data, copied into the initializer slide (if not present)
  style: style, // style, copied into the initializer slide (if not present)
  slides: [
    // silde
    {
      config: {}, // Config.Chart
      filter: () => true, // data.filter TODO: not declarative, cannot be serialized ??? string => Function
      style: {}, // Styles.Chart
      animOptions: {} // Anim.Options
    },
    // ... or list of slides
    [
      {}, // phase1,
      {}  // phase2, ...
    ]
  ]
};

let vpd = {
  data: data,
  style: style,
  slides: [
    { // slide 1
      filter: record => record.Function !== 'Defense',
      config: {
        channels: {
          y: {
            set: ['Amount[B$]', 'Function'],
            range: {
              min: '0%',
              max: '100%'
            }
          },
          x: {
            set: ['Year']
          },
          color: 'Function'
        },
        title: 'U.S. Non-Defense R&D Budget by Functions',
        geometry: 'area'
      }
    },
    { // slide 2
      config: {
        title: 'Share of Total Expenditures %',
        align: 'stretch'
      }
    },
    [ // slide 3
      { // slide 3.1
        filter: record => record.Function === 'Health' || record.Function === 'Space',
        config: {
          title: 'Compare Space & Health',
          align: 'min',
          split: true
        }
      },
      { // slide 3.2
        filter: record => record.Function !== 'Defense',
        config: {
          title: 'All Non-defense Functions Side-by-Side',
          align: 'min',
          split: true
        }
      }
    ],
    [ // slide 4
      { // slide 4.1
        filter: null,
        config: {
          title: 'Show Defense Expenditures',
          split: false
        }
      },
      { // slide 4.2
        filter: record => record.Function === 'Defense',
        config: {
          title: 'Defense Expenditures',
          align: 'min'
        }
      }
    ],
    { // slide 5
      filter: null,
      config: {
        title: 'Total U.S. R&D Budget',
      }
    }
  ]
};

const vp = document.querySelector("vizzu-player");
vp.slides = vpd; // init slides
vp.vizzu.initializing.then(chart => chart.on('plot-axis-label-draw', labelHandler));

/*
TODO:
 - vizzu spinner
 - `animate` with seek
 - `reverse` animation
 - !SEEK!
 - animOptions check
 - styling with CSS variables
*/
