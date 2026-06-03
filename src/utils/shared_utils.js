
//the main calculation for the interval between notification
export const normalTimerMath = (intervalType, coefficient, currentX) => {
    let nextIntervalNormalized;
    switch(intervalType){
        case 0://linear
            nextIntervalNormalized = 1 + coefficient * currentX;
            break;
        case 1://exponential
            nextIntervalNormalized = coefficient ** currentX;
            break;
        case 2: case 3: //constant
            nextIntervalNormalized = coefficient;
            break;
        default: break;
    }
    return nextIntervalNormalized;
}


/**
let nextIntervalNormalized;
switch(appGroup.notifyDeltaFnType){
    case 0://linear
        nextIntervalNormalized = 1 + appGroup.notifyDeltaFnValue * (appGroup.notifyUsed+=1);
        break;
    case 1://exponential
        nextIntervalNormalized = appGroup.notifyDeltaFnValue ** (appGroup.notifyUsed+=1);
        break;
    case 2://constant
        break;
    default: continue;
}
appGroup.nextNotify += nextIntervalNormalized * appGroup.normalToLimit;
 */