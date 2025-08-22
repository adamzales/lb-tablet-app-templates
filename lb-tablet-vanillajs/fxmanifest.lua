fx_version "cerulean"
game "gta5"

title "Aplikace pro blackmarket - LB Tablet"
author "adamzales"

client_script 'client/*.lua'

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/*.lua'}

shared_scripts {
    '@es_extended/imports.lua',
    '@ox_lib/init.lua',
    '@Renewed-Lib/init.lua',
    'config.lua'
}


file "ui/**"
ui_page "ui/index.html"
