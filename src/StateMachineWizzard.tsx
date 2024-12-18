import './App.css'
import React, {useState} from "react";
import {Step1} from "./components/Step1.tsx";
import {Step2} from "./components/Step2.tsx";
import {StepConfirmation} from "./components/StepConfirmation.tsx";

export interface StateMachineConfig<StepType, StepNames extends string> {
    initialStep: StepNames;
    steps: {
        [key in StepNames]: {
            canAdvance: (state: StepType) => boolean;
        }
    };
    views: {
        [key in StepNames]: React.ComponentType<{
            state: StepType;
            setState?: React.Dispatch<React.SetStateAction<StepType>>;
        }>
    }
}

export type WizzardState = {
    name: string;
    age: number;
};

export type StepNames = "step1" | "step2" | "confirmation";

export type ViewComponent<StepType, StepNames extends string> = StateMachineConfig<StepType, StepNames>['views'][StepNames]


const stateMachineConfig: StateMachineConfig<WizzardState, StepNames> = {
    initialStep: "step1",
    steps: {
        step1: {
            canAdvance: state => !!state.name
        },
        step2: {
            canAdvance: state => !!state.age
        },
        confirmation: {
            canAdvance: () => true
        }
    },
    views: {
        step1: ({state, setState}) => <Step1 state={state} setState={setState}/>,
        step2: ({state, setState}) => <Step2 state={state} setState={setState}/>,
        confirmation: ({state}) => <StepConfirmation state={state}/>
    }
}

const getStepView = <StepType, StepNames extends string>(
    config: StateMachineConfig<StepType, StepNames>,
    stepName: StepNames
): ViewComponent<StepType, StepNames> => config.views[stepName];


const StateMachineWizzard = () => {
    const [wizzardState, setWizzardState] = useState<WizzardState>({name: "", age: 0});
    const [currentStape, setCurrentStape] = useState<StepNames>(stateMachineConfig.initialStep)

    const StepComponent = getStepView<WizzardState, StepNames>(stateMachineConfig, currentStape);

    const handleNextStep = () => {

        const nextStepsHashMap: { [key in StepNames]: StepNames | boolean } = {
            step1: "step2",
            step2: "confirmation",
            confirmation: false
        }

        const canAdvance = stateMachineConfig.steps[currentStape].canAdvance(wizzardState)

        if (!canAdvance) alert("You can't move foward yet, please check your introduced data")

        if (canAdvance) {
            if (typeof nextStepsHashMap[currentStape] === "string") {
                setCurrentStape(nextStepsHashMap[currentStape])
            }
        }
    }

    const handlePreviousStep = () => {

        const previousStepsHashMap: { [key in StepNames]: StepNames | boolean } = {
            step1: false,
            step2: "step1",
            confirmation: "step2"
        }
        if (previousStepsHashMap[currentStape]) {
            if (typeof previousStepsHashMap[currentStape] === "string") {
                setCurrentStape(previousStepsHashMap[currentStape])
            }
        }
    }

    return (
        <section>
            <h1>State Machine Wizard</h1>
                <StepComponent state={wizzardState} setState={setWizzardState}/>

            <div>
                {
                    currentStape !== "step1" && (
                        <button onClick={handlePreviousStep}>Back</button>
                    )
                }

                {
                    currentStape !== "confirmation" && (
                        <button
                            style={{
                                backgroundColor: "orange"
                            }}
                            onClick={handleNextStep}>Next</button>
                    )
                }

            </div>
        </section>
    )
}

export default StateMachineWizzard
