RegisterNetEvent("lb-tablet-reactts:notification", function(message)
    local src = source
    local tablet = exports["lb-tablet"]:GetEquippedTablet(src)

    if not tablet then
        return
    end

    exports["lb-tablet"]:SendNotification({
        tabletId = tablet,
        app = Config.Identifier,
        title = message
    })
end)
