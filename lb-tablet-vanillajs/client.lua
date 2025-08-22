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

			exports["lb-tablet"]:SendCustomAppMessage(resourceName, "updateDirection", direction)
		end
	end
end

local function AddApp()
	local success, reason = exports["lb-tablet"]:AddCustomApp({
		identifier = resourceName,
		name = "Dream Market",
		defaultApp = true,
		icon = "/ui/assets/icon.webp",
		ui = "ui/index.html",
		removable = false,

		images = {
			"https://cfx-nui-" .. resourceName .. "/ui/assets/screenshot-dark.webp",
			"https://cfx-nui-" .. resourceName .. "/ui/assets/screenshot-light.webp"
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

AddApp()

AddEventHandler("onResourceStart", function(resource)
	Wait(500)

	if resource == "lb-tablet" then
		AddApp()
	end
end)
