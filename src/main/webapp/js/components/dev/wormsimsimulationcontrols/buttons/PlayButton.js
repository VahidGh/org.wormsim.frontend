define(function (require) {

    var React = require('react'),
        GEPPETTO = require('geppetto');

    return React.createClass({
        mixins: [require('mixins/TutorialMixin'), require('mixins/Button')],

        popoverTitle: 'Play Experiment',

        popoverContent: "Once you have loaded a simulation, it's time to see it in action by pressing Start. Click it now to see the simulation in action",

        onClick: function() {
            GEPPETTO.Console.executeCommand("Project.getActiveExperiment().play({step:1});");
        },

        componentDidMount: function() {
            GEPPETTO.on('start:tutorial', (function() {               
                GEPPETTO.once('experiment:loaded', (function(){
                    if(GEPPETTO.tutorialEnabled) {
                        this.showPopover;
                    }
                }).bind(this)); 
            }).bind(this));
        },

        getDefaultProps: function() {
            return {
                label: 'Play',
                className: 'pull-right',
                icon: 'fa fa-play',
                onClick: this.onClick
            };
        }

    });
});