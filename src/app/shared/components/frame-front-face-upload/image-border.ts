declare var $: any;
const guidelines = [];
const positions = ['top', 'left', 'bottom', 'right'];
let thisClassObject;
export class ImageBorder {


    startX = 0;
    startY = 0;
    start = 0;
    node;
    topic;
    axis;
    info;
    position;
    value;
    unit;
    max;
    pos;
    min;

    constructor(node) {
        /** binds the div*/
        const topic = node.getAttribute('data-topic');
        const axis = node.getAttribute('data-axis');

        this.node = node;
        this.topic = topic;
        this.axis = axis;
        this.info = topic.split('-')[1]; // get top, right etc.

        this.position = 0;
        this.value = 0;
        this.max = 0;
        this.pos = positions.indexOf(this.info); // get index of position probably to set the values in input
        this.min = 10;
        guidelines[topic] = this;
        thisClassObject = this;
    };

    /** This is called on guideline slider mousedown event */
    startDrag(e) {
        this.startX = e.clientX;
        this.startY = e.clientY;

        this.start = guidelines[this.topic].position;

        document.body.setAttribute('data-move', this.axis);

        this.node.setAttribute('data-active', '');

        thisClassObject = this;

        /** bind mouse up and down event **/
        document.addEventListener('mousemove', this.updateGuideline);

        document.addEventListener('mouseup', this.endDrag.bind(this));

    }

    /** This event is called when mouseup event is triggered.  */

    endDrag(e) {
        document.body.removeAttribute('data-move');
        this.node.removeAttribute('data-active');
        document.removeEventListener('mousemove', this.updateGuideline);

    };

    /** This function is used to calculate the position of mouse and hence calculate the slider's position */
    updateGuideline = function (e) {
        let value;

        if (thisClassObject.topic === 'slice-top') {
            value = e.clientY - thisClassObject.startY + thisClassObject.start;
        }

        if (thisClassObject.topic === 'slice-right') {
            value = thisClassObject.startX - e.clientX + thisClassObject.start;
        }

        if (thisClassObject.topic === 'slice-bottom') {
            value = thisClassObject.startY - e.clientY + thisClassObject.start;
        }

        if (thisClassObject.topic === 'slice-left') {
            value = e.clientX - thisClassObject.startX + thisClassObject.start;
        }

        const scale = parseFloat($('#subject').attr('data-scale'));

        thisClassObject.setValue(thisClassObject.topic, (value * 1 / ((scale / 100))) | 0);

        thisClassObject.setPosition(thisClassObject.value);
    };

    /**
     * set max value for each slider
     * @param max - value to be set 
     */

    setMax(max) {
        this.max = max;
    }
    /** set the value of css requiried for the image slice */
    setValue(topic, value) {

        if (value > this.max) { value = this.max; }
        if (value < this.min) { value = this.min; }

        this.value = value;
        this.node.setAttribute('data-value', value);

    }
    /** sets the position of slider in preview */
    setPosition(value) {
        this.value = value;
        this.updateGuidelinePos();
    }
    /** sets the position of slider in preview */
    updateGuidelinePos() {

        const scale = parseFloat($('#subject').attr('data-scale')) / 100;
        this.position = this.value * scale | 0;

        this.node.style[this.info] = this.position + 'px';

    };
}
