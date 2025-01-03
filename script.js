class GaugeManager {
  constructor() {
    this.dials = [];
  }

  addDial(config) {
    try {
      const gauge = Gauge(document.getElementById(config.id), {
        dialStartAngle: config.dialStartAngle || 135,
        dialEndAngle: config.dialEndAngle || 45,
        max: config.max || 100,
        value: config.value || 0,
        label: config.label || ((value) => Math.round(value)),
      });

      this.dials.push({
        name: config.name,
        dial: gauge,
      });
    } catch (e) {
      console.error('Error creating gauge:', e);
    }
  }

  updateDial(name, value) {
    const dial = this.dials.find((d) => d.name === name);
    if (dial) {
      dial.dial.setValue(value);
    }
  }

  animateDial(name, value, duration) {
    const dial = this.dials.find((d) => d.name === name);
    if (dial) {
      dial.dial.setValueAnimated(value, duration || 1);
    }
  }
}

// Create and initialize gauges
const gaugeManager = new GaugeManager();
gaugeManager.addDial({ name: 'power', id: 'powerGauge', max: 574, value: 75 });
gaugeManager.addDial({ name: 'bob', id: 'bobGauge', max: 253, value: 50 });
gaugeManager.addDial({ name: 'strength', id: 'strengthGauge', max: 491, value: 98 });

// Listen for messages from Ignition
window.addEventListener('message', (event) => {
  if (event.data.type === 'updateGauge') {
    gaugeManager.updateDial(event.data.name, event.data.value);
  }
});

// Example Animation
function animateGauges() {
  gaugeManager.animateDial('power', Math.random() * 574, 1);
  gaugeManager.animateDial('bob', Math.random() * 253, 1);
  gaugeManager.animateDial('strength', Math.random() * 491, 1);

  setTimeout(animateGauges, 5000);
}
animateGauges();
