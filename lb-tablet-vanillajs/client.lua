while GetResourceState("lb-tablet") ~= "started" do
	Wait(0)
end

local function AddApp()
	local success, reason = exports["lb-tablet"]:AddCustomApp({
		identifier = "vanillajs",
		name = "Test App",
		defaultApp = true,
		ui = "http://localhost:5500/ui/index.html",
		-- ui = GetCurrentResourceName() .. "/ui/index.html",
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
