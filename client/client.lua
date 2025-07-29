function StartTimer(time, title, subtitle)
    SendNUIMessage({ 
        action = 'startTimer',
        time = time or 1800,
        title = title or '' ,
        subtitle = subtitle or '',
    })
    active = true
    for i=1, time do
        Wait(1000)
        if reason then
            local var = reason
            reason = false
            return reason
        end
    end
    return 'timerEnded'
end

function StopTimer(reason)
    if not reason then
        reason = 'manualStop'
    end
    SendNUIMessage({ action = 'stopTimer' })
    reason = reason
end

function ChangeText(title, subtitle)
    SendNUIMessage({ 
        action = 'changeText',
        title = title,
        subtitle = subtitle
    });
end

function isTimerActive()
    return active
end

RegisterNUICallback('onTimerEnd', function(data, cb)
    TriggerEvent('timer:timerEnd')
end)

exports('changeText', ChangeText)
exports('startTimer', StartTimer)
exports('stopTimer', StopTimer)
exports('isTimerActive', isTimerActive)
