while GetResourceState("lb-tablet") ~= "started" do
	Wait(0)
end

local resourceName = GetCurrentResourceName()
local appOpen = false

local function SendDirection()
	Wait(500) -- allow the app to initialize

	local directions = { "N", "NE", "E", "SE", "S", "SW", "W", "NW" }
	local oldYaw, direction

	while appOpen do
		Wait(0)

		local yaw = math.floor(360.0 - ((GetFinalRenderedCamRot(0).z + 360.0) % 360.0) + 0.5)

		if yaw == 360 then
			yaw = 0
		end

		-- get closest direction
		if oldYaw ~= yaw then
			oldYaw = yaw
			direction = yaw .. "° " .. directions[math.floor((yaw + 22.5) / 45.0) % 8 + 1]

			SendAppMessage("updateDirection", direction)
		end
	end
end

local url = GetResourceMetadata(GetCurrentResourceName(), "ui_page", 0)

local function AddApp()
	Wait(500) -- Wait for the AddCustomApp export to be registered

	local success, reason = exports["lb-tablet"]:AddCustomApp({
		identifier = Config.Identifier,
		name = Config.Name,
		description = Config.Description,
		defaultApp = Config.DefaultApp,
		developer = Config.Developer,

		ui = url,
		icon = url:find("http") and url .. "/public/icon.svg" or "/ui/dist/icon.svg",

		images = {
			"https://cfx-nui-" .. resourceName .. "/ui/dist/screenshot-dark.webp",
			"https://cfx-nui-" .. resourceName .. "/ui/dist/screenshot-light.webp"
		},

		onInstall = function()
			print("install")
		end,

		onUninstall = function()
			print("uninstall")
		end,

		onOpen = function()
			print("open")
			appOpen = true
			SendDirection()
		end,

		onClose = function()
			print("close")
			appOpen = false
		end,
	})

	if not success then
		print("Failed to add app: ", reason)
	else
		print("Successfully added app")
	end
end

RegisterNUICallback("notification", function(data, cb)
	if data.type == "gta" then
		BeginTextCommandThefeedPost("STRING")
		AddTextComponentSubstringPlayerName(data.message)
		EndTextCommandThefeedPostTicker(false, false)
	else
		TriggerServerEvent("lb-tablet-reactts:notification", data.message)
	end
end)

AddApp()

AddEventHandler("onResourceStart", function(resource)
	if resource == "lb-tablet" then
		AddApp()
	end
end)
