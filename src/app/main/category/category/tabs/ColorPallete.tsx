import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { SketchPicker } from 'react-color';

/**
 * color pallete tab.
 */
function ColorPalleteTab() {
    const methods = useFormContext();
    const { control, formState } = methods;
    const { errors } = formState;
    const [selectedColor, setSelectedColor] = useState('#000000'); // Set a default color if needed
    const [selectedBoxColor, setSelectedBoxColor] = useState('#000000'); // Set a default color if needed

    const handleColorChange = (color, target) => {
        // Set the selected color based on the target (icon_color or box_color)
        if (target === 'icon_color') {
            setSelectedColor(color.hex);
        } else if (target === 'box_color') {
            setSelectedBoxColor(color.hex);
        }

        // Set values in the form using react-hook-form
        methods.setValue('icon_color', selectedColor);
        methods.setValue('box_color', selectedBoxColor);
    };

    return (
        <div>
            <Controller
                name="icon_color"
                control={control}
                render={({ field }) => (
                    <div>
                        <label className="mb-7 text-black text-lg">
                            <span>Icon Color</span>
                            <input
                                className="mt-1"
                                placeholder=""
                                name="icon_color"
                                value={selectedColor}
                                readOnly
                            />
                            <SketchPicker
                                color={selectedColor}
                                onChange={(color) => handleColorChange(color, 'icon_color')}
                            />
                        </label>
                    </div>
                )}
            />
            <Controller
                name="box_color"
                control={control}
                render={({ field }) => (
                    <div>
                        <label className="mb-7 text-black text-lg">
                            <span>Box Color</span>
                            <input
                                className="mt-1"
                                placeholder=""
                                name="icon_color"
                                value={selectedBoxColor}
                                readOnly
                            />
                            <SketchPicker
                                color={selectedBoxColor}
                                onChange={(color) => handleColorChange(color, 'box_color')}
                            />
                        </label>
                    </div>
                )}
            />
        </div>
    );
}

export default ColorPalleteTab;
