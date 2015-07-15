define(function(require) {

    var React = require('react');

    var PlayButton = require('./buttons/PlayButton');
    var PauseButton = require('./buttons/PauseButton');
    var StopButton = require('./buttons/StopButton');

    var GEPPETTO = require('geppetto');

    var Controls = React.createClass({

        getInitialState: function() {
            return {
                disablePlay:true,
                disablePause:true,
                disableStop:true
            }
        },

        componentDidMount: function() {

            var self = this;

            GEPPETTO.on(Events.Experiment_loaded, function(){
            	var experiment = window.Project.getActiveExperiment();
            	if(experiment.getStatus()==GEPPETTO.Resources.ExperimentStatus.COMPLETED){
            		self.setState({disablePlay:false, disablePause:true, disableStop:true});
            	}
            	else if(experiment.getStatus()==GEPPETTO.Resources.ExperimentStatus.DESIGN){
            		self.setState({disablePlay:true, disablePause:true, disableStop:true});
            	}
            });
            
            GEPPETTO.on(Events.Experiment_running, function(){
                self.setState({disablePlay:true, disablePause:true, disableStop:true});
            });

            GEPPETTO.on(Events.Experiment_completed, function(){
                self.setState({disablePlay:false, disablePause:true, disableStop:true});
            });
            
            GEPPETTO.on(Events.Experiment_play, function(){
                self.setState({disablePlay:true, disablePause:false, disableStop:false});
            });

            GEPPETTO.on(Events.Experiment_pause, function(){
                self.setState({disablePlay:false, disablePause:true, disableStop:false});
            });

            GEPPETTO.on(Events.Experiment_stop, function(){
                self.setState({disablePlay:false, disablePause:true, disableStop:true});
            });
            
            GEPPETTO.on('disable_all', function(){
                self.setState({disablePlay:true, disablePause:true, disableStop:true});
            });
            GEPPETTO.on(Events.Experiment_replay, function(){
                self.setState({disablePlay:true, disablePause:false, disableStop:false});
            });
            GEPPETTO.on(Events.Experiment_over, function(){
            	if(GEPPETTO.getVARS().playLoop === false){
            		self.setState({disablePlay:false, disablePause:true, disableStop:true});
            	}
            });
        },

        render: function () {
            return React.DOM.div({className:'simulation-controls'},
                StopButton({disabled:this.state.disableStop}),
                PauseButton({disabled:this.state.disablePause}),
                PlayButton({disabled:this.state.disablePlay})
            );
        }

    });

    React.renderComponent(Controls({},''), document.getElementById('sim-toolbar'));

});