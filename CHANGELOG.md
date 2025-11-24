# Changelog

All notable changes to this project will be documented in this file.

## [1.0.1] - 2024-11-24

### Changed
- Modified code execution logic, all selected code now runs through temporary do files to ensure timely stopping on errors
- Removed code length limit check, unified use of temporary file execution method

## [1.0.0] - 2024-01-01

### Added
- Initial terminal-only version
- Simplified configuration with single setting
- Cross-platform terminal support

### Changed
- Removed Windows OLE integration
- Removed macOS AppleScript integration  
- Removed Linux xdotool integration
- Simplified codebase and dependencies

### Removed
- External application support
- Platform-specific dependencies
- Complex configuration options