import React from 'react';

import Tasks from './../components/Tasks';

class Timer extends React.Component{
    constructor(){
        super();

        this.state = {
            isSession: true,
            timerSecond:0,
            intervalId:0,
            maxPomodoros: 0,
            qtdPomodoros: 0,
            task: null
        };

        this.play = this.play.bind(this);
        this.stop = this.stop.bind(this);
        this.skip = this.skip.bind(this);
        this.decreaseTimer = this.decreaseTimer.bind(this);
    }

    setTask(task, pomodoros) {
        this.setState({
            task: task,
            maxPomodoros: +pomodoros
        });

        this.reset();
    }

    play(){
        if(!this.state.task){
            return alert('Selecione uma tarefa para iniciar o pomodoro!');
        }

        let intervalId = setInterval(this.decreaseTimer, 1000);
        
        this.props.setTimer();

        const startButton = document.getElementsByClassName('startButton')[0];
        const stopButton = document.getElementsByClassName('stopButton')[0];
        startButton.style.display = 'none';
        stopButton.style.display = 'block';

        this.setState({
            intervalId: intervalId
        })

        this.props.onPlayTimer(true);
    }

    stop(){
        clearInterval(this.state.intervalId);

        this.props.setTimer();

        if(this.state.timerSecond !== 0){
            this.setState({
                timerSecond: 0,
            });
        }
        
        const startButton = document.getElementsByClassName('startButton')[0];
        const stopButton = document.getElementsByClassName('stopButton')[0];
        startButton.style.display = 'block';
        stopButton.style.display = 'none';
        const eng = document.getElementsByClassName('engrenagem')[0];
        eng.style.visibility = "visible"

        this.props.onPlayTimer(false);
    }

    reset() {
        this.stop();
        this.setState({
            isSession: true,
            qtdPomodoros: 0
        });

        const timer = document.getElementById('timerId');

        timer.classList.add('Timer');
        timer.classList.remove('TimerLb');
        timer.classList.remove('TimerSb');

        const Psbreak = document.getElementsByClassName('Psbreak')[0];
        const Lbreak = document.getElementsByClassName('Lbreak')[0];

        Psbreak.style.display = "block";
        Lbreak.style.display = "none";

        const skip = document.getElementsByClassName('skipButton')[0];
        const stop = document.getElementsByClassName('stopButton')[0]; 

        stop.style.display = "none";
        skip.style.display = "none";
    }

    skip(){
        this.props.skipTimer();
        if(this.state.timerSecond!==0){
            this.setState({
                timerSecond:0,
            });
        }
    }

    decreaseTimer(){
        if(this.state.qtdPomodoros === this.state.maxPomodoros)
            return this.reset();

        switch(this.state.timerSecond){
            case 0:
                if(this.props.timerMinute === 0){
                    console.log(this.state.isSession)

                    if(this.state.isSession){
                        this.setState({
                            isSession: false 
                        });

                        this.setState({
                            qtdPomodoros: this.state.qtdPomodoros + 1
                        });

                        this.props.toggleInterval(this.state.isSession);

                        if(this.props.isLong === 0){
                            const Psbreak = document.getElementsByClassName('Psbreak')[0];
                            const Lbreak = document.getElementsByClassName('Lbreak')[0];

                            Psbreak.style.display = "none";
                            Lbreak.style.display = "block";

                            const skip = document.getElementsByClassName('skipButton')[0];
                            const stop = document.getElementsByClassName('stopButton')[0]; 

                            stop.style.display = "none";
                            skip.style.display = "block";

                        }else{
                            const Psbreak = document.getElementsByClassName('Psbreak')[0];
                            const Lbreak = document.getElementsByClassName('Lbreak')[0];

                            Psbreak.style.display = "block";
                            Lbreak.style.display = "none";

                            const skip = document.getElementsByClassName('skipButton')[0];
                            const stop = document.getElementsByClassName('stopButton')[0]; 

                            stop.style.display = "none";
                            skip.style.display = "block";
                        }
                    }else{
                        this.setState({
                            isSession: true,
                        });
    
                        this.props.toggleInterval(this.state.isSession);
                        
                        const Psbreak = document.getElementsByClassName('Psbreak')[0];
                        const Lbreak = document.getElementsByClassName('Lbreak')[0];
                        const skip = document.getElementsByClassName('skipButton')[0];
                        const stop = document.getElementsByClassName('stopButton')[0];

                        skip.style.display = "none";
                        stop.style.display = "block";
                        Psbreak.style.display = "block";
                        Lbreak.style.display = "none"; 
                    }
                }else{
                    this.props.decreaseTimerMinute()
                    this.setState({
                        timerSecond: 59,
                    })
                }
            break;
            default:
                this.setState((prevState)=>{
                    return{
                        timerSecond: prevState.timerSecond-1,
                    }
                })
            break;
        }
    }

    render(){
        return(
            <>
                <div className="Timer" id="timerId">
                    <h1 className="Psbreak">{this.state.isSession === true ? "Pomodoro" : "Short Break"}</h1>
                    <h1 className="Lbreak">Long Break</h1>
                    <h2>{
                    this.props.timerMinute === 0
                    ? "00"
                    : this.props.timerMinute < 10
                    ? "0" + this.props.timerMinute
                    : this.props.timerMinute
                                }:{
                    this.state.timerSecond === 0 
                    ? "00"
                    : this.state.timerSecond < 10 
                    ? "0" + this.state.timerSecond 
                    : this.state.timerSecond}</h2>
                    <button className="startButton" onClick={this.play}>Start</button>
                    <button className="stopButton" onClick={this.stop}>Stop</button>
                    <button className="skipButton" onClick={this.skip}>Skip</button>
                </div>
                <Tasks
                    tasks={this.state.tasks}
                    setTask={this.setTask.bind(this)}
                />
            </>
        )
    }
}

export default Timer;