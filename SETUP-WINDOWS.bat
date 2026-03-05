@echo off
echo ===================================================
echo  Κοινή Greek — Настройка проекта
echo ===================================================
echo.

REM Rename env.example.txt to .env.local if not exists
if not exist ".env.local" (
    copy "env.example.txt" ".env.local"
    echo ✅ Файл .env.local создан!
    echo    Откройте его и заполните своими ключами.
) else (
    echo ℹ️  Файл .env.local уже существует.
)

echo.
echo Следующий шаг: откройте .env.local в Блокноте
echo и замените все заглушки (XXXXXXXX) на настоящие ключи.
echo.
pause
