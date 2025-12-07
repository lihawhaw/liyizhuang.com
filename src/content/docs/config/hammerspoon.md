---
title: hammerspoon 配置
---

## hammerspoon 配置

```shell
// ~/.hammerspoon/init.lua

local keycodes = require("hs.keycodes")
local application = require("hs.application")

function updateInputMethod(appName)
	--print("当前输入法是:", keycodes.currentSourceID())
	local switchMethodStatus = keycodes.setMethod("微信输入法")
	local switchMethodIdStatus = keycodes.currentSourceID("com.tencent.inputmethod.wetype.pinyin")
	print("", appName, "", switchMethodStatus, switchMethodIdStatus)
end

-- 应用切换时回调
appWatcher = application.watcher.new(function(appName, eventType)
	-- updateInputMethod(appName)

	if eventType == application.watcher.activated then
		updateInputMethod(appName)
	end
end)

appWatcher:start()

```
